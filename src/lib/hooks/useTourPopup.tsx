import React, { useEffect } from 'react';
import type { Step } from '../../types';
import { debounce } from '../utils';
import { getBoundingClientRectRelativeToDocument } from '../utils';

type Args = {
  currentStep: Step;
  ref: React.RefObject<HTMLDivElement | null>;
  onNext: () => void;
  category: string;
};

export function useTourPopup({ currentStep, ref, onNext, category }: Args) {
  const { target, nextOn } = currentStep || {};

  useEffect(() => {
    if (!target || !ref.current || !ref.current.parentElement) return;

    const targetElement: HTMLElement | null = document.querySelector(target);
    if (!targetElement) {
      throw new Error(
        `Target <b>${target}</b> not found for current step in category '${category}'.`
      );
    }

    if (nextOn) {
      if (typeof nextOn === 'string') {
        targetElement.addEventListener(nextOn, onNext);
      } else {
        const { event, target } = nextOn;
        const nextTarget = document.querySelector(target);
        if (nextTarget) {
          nextTarget.addEventListener(event, onNext);
        } else {
          throw new Error(
            `nextOn target <b>${target}</b> not found for current step in category '${category}'.`
          );
        }
      }
    }

    targetElement.classList.add('tour__target');

    adjustTourPosition(ref.current.parentElement, targetElement);

    const debouncedAdjust = debounce(adjustTourPosition, 100);
    const handleResize = () =>
      debouncedAdjust(ref.current?.parentElement, targetElement);
    window.addEventListener('resize', handleResize);

    return () => {
      targetElement.classList.remove('tour__target');

      if (nextOn) {
        if (typeof nextOn === 'string') {
          targetElement.removeEventListener(nextOn, onNext);
        } else {
          const { event, target } = nextOn;
          const nextTarget = document.querySelector(target);
          if (nextTarget) {
            nextTarget.removeEventListener(event, onNext);
          }
        }
      }

      window.removeEventListener('resize', handleResize);
    };
  }, [currentStep?.target]);
}

function adjustTourPosition(
  tourElement: HTMLElement | null | undefined,
  targetElement: HTMLElement | null | undefined
) {
  if (!tourElement || !targetElement) return;

  const targetRect = getBoundingClientRectRelativeToDocument(targetElement);
  const tourRect = getBoundingClientRectRelativeToDocument(tourElement);

  // TODO: Extract from CSS variables
  const OUTLINE_WIDTH = 2;
  const OUTLINE_OFFSET = 6;

  requestAnimationFrame(() => {
    // if the target is very close to the left edge of the screen
    // then we need to move the tour to the right so it doesn't clip
    const DEFAULT_LEFT_DISTANCE = OUTLINE_WIDTH + OUTLINE_OFFSET;
    const PREFFERED_LEFT_DISTANCE =
      targetRect.right - tourRect.width + OUTLINE_WIDTH + OUTLINE_OFFSET;

    const DEFAULT_TOP_DISTANCE = targetRect.bottom + OUTLINE_WIDTH * 2 + 10;

    const distance: { left: number; top: number } = {
      left: 0,
      top: DEFAULT_TOP_DISTANCE,
    };

    if (DEFAULT_LEFT_DISTANCE > PREFFERED_LEFT_DISTANCE) {
      tourElement.style.width = `95%`;
      distance.left = DEFAULT_LEFT_DISTANCE;
    } else {
      distance.left = PREFFERED_LEFT_DISTANCE;
    }

    tourElement.classList.add('tour__wrapper--visible');
    tourElement.style.translate = `${distance.left}px ${distance.top}px`;

    window.scrollTo({
      behavior: 'smooth',
      top: targetRect.top - 100,
    });
  });
}

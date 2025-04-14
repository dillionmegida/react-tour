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
    const handleResize = () => debouncedAdjust(ref.current?.parentElement, targetElement);
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
    const distanceFromLeft = targetRect.right - tourRect.width + OUTLINE_WIDTH + OUTLINE_OFFSET;
    const distanceFromTop = targetRect.bottom + OUTLINE_WIDTH * 2 + 10;

    tourElement.classList.add('tour__wrapper--visible');
    tourElement.style.translate = `${distanceFromLeft}px ${distanceFromTop}px`;

    window.scrollTo({
      behavior: 'smooth',
      top: targetRect.top - 100,
    });
  });
}

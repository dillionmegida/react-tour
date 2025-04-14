import React, { useEffect } from 'react';
import type { Step } from '../../types/TourType';

function getBoundingClientRectRelativeToDocument(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

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
    window.addEventListener('resize', () => {
      adjustTourPosition(ref.current?.parentElement, targetElement);
    });

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

      window.removeEventListener('resize', () => {
        adjustTourPosition(ref.current?.parentElement, targetElement);
      });
    };
  }, [currentStep?.target]);
}

function adjustTourPosition(
  tourElement: HTMLElement | null | undefined,
  targetElement: HTMLElement | null | undefined
) {
  if (!tourElement || !tourElement.parentElement || !targetElement) return;

  // TODO: figure out how to extract this from ../../lib/variables.scss
  const OUTLINE_WIDTH = 2;
  const OUTLINE_OFFSET = 6;

  const targetElementClientRect =
    getBoundingClientRectRelativeToDocument(targetElement);

  const tourElemClientRect =
    getBoundingClientRectRelativeToDocument(tourElement);

  // distance from left of the window, so that the right edge of
  // the tour element is at the right edge of the target element
  const distanceFromLeft =
    targetElementClientRect.right -
    tourElemClientRect.width +
    OUTLINE_WIDTH +
    OUTLINE_OFFSET;

  // distance from top of the window, so that the tour element
  // shows below the target element
  const distanceFromTop =
    targetElementClientRect.bottom + OUTLINE_WIDTH * 2 + 10;

  tourElement.style.translate = `${distanceFromLeft}px ${distanceFromTop}px`;

  tourElement.classList.add('tour__wrapper--visible');

  // TODO: if the position of the tour is "top", scroll the tour element into view
  window.scrollTo({
    behavior: 'smooth',
    top: targetElementClientRect.top - 100,
  });
}

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

    targetElement.classList.add('tour-target');

    // TODO: figure out how to extract this from ../../lib/variables.scss
    const OUTLINE_WIDTH = 2;
    const OUTLINE_OFFSET = 6;

    const rect = getBoundingClientRectRelativeToDocument(targetElement);

    ref.current.parentElement.classList.add('tour-wrapper--visible');

    ref.current.parentElement.style.translate = `${
      rect.left - OUTLINE_OFFSET - OUTLINE_WIDTH
    }px ${rect.bottom + OUTLINE_WIDTH * 2 + 10}px`;

    // TODO: if the position of the tour is "top", scroll the tour element into view
    window.scrollTo({
      behavior: 'smooth',
      top: rect.top - 100,
    });

    return () => {
      targetElement.classList.remove('tour-target');

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
    };
  }, [currentStep?.target]);
}

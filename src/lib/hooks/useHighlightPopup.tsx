import React, { useEffect } from 'react';
import type { Step } from '../../types/Step';

type Args = {
  currentStep: Step;
  ref: React.RefObject<HTMLDivElement | null>;
  onNext: () => void;
};

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

export default function useHighlightPopup({ currentStep, ref, onNext }: Args) {
  const { target, nextOn } = currentStep || {};

  useEffect(() => {
    if (!target) return;

    const targetElement: HTMLElement | null = document.querySelector(target);
    if (!targetElement) return;

    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    if (nextOn) {
      targetElement.addEventListener(nextOn, onNext);
    }

    const OUTLINE_WIDTH = 2;
    const OUTLINE_OFFSET = 6;

    targetElement.style.outline = `${OUTLINE_WIDTH}px solid red`;
    targetElement.style.outlineOffset = `${OUTLINE_OFFSET}px`;

    const rect = getBoundingClientRectRelativeToDocument(targetElement);

    ref.current.parentElement!.style.visibility = 'visible';
    ref.current.parentElement!.style.opacity = '1';

    ref.current.parentElement.style.translate = `${
      rect.left - OUTLINE_OFFSET - OUTLINE_WIDTH
    }px ${rect.bottom + OUTLINE_WIDTH * 2 + 10}px`;

    return () => {
      targetElement.style.removeProperty('outline');
      targetElement.style.removeProperty('outline-offset');

      if (nextOn) {
        targetElement.removeEventListener(nextOn, onNext);
      }
    };
  }, [currentStep?.target]);
}

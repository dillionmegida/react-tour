import useHighlightPopup from '../../lib/hooks/useHighlightPopup';
import { useLocalStorage } from '../../lib/hooks';
import { Step } from '../../types';
import React, { useRef, useEffect } from 'react';
import { capitalize } from '../../lib/utils';
import { getActiveStepKey } from '../../lib/constants';

type Props = {
  steps: Step[];
  category: string;
  onFinish: () => void;
};

export default function TourCategory({ steps, category, onFinish }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useLocalStorage<number>({
    method: 'get',
    key: getActiveStepKey(category),
    defaultValue: 0,
  });

  const stepIndex = Number(currentStepIndex) || 0;

  useEffect(() => {
    if (stepIndex >= steps.length) {
      onFinish();
    }
  }, [stepIndex, steps.length, onFinish]);

  const currentStep = steps[stepIndex];

  const handleNext = () => {
    setCurrentStepIndex(stepIndex + 1);
  };

  const ref = useRef<HTMLDivElement>(null);
  useHighlightPopup({ currentStep, ref, onNext: handleNext });

  if (stepIndex >= steps.length) return null;

  return (
    <div
      className={
        'highlight-wrapper ' +
        (currentStepIndex === steps.length - 1 ? 'finished' : '')
      }
    >
      <div className="step-info">
        <span>
          {capitalize(category)} - Step {stepIndex + 1} / {steps.length}
        </span>
      </div>
      <div className="highlight" ref={ref}></div>
      <div className="highlight-content">{currentStep.content}</div>
      <div className="highlight-actions">
        <button
          className={
            'highlight-next-btn ' + (currentStep.nextOn ? 'disabled' : '')
          }
          disabled={!!currentStep.nextOn}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

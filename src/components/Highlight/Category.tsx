import useHighlightPopup from '../../lib/hooks/useHighlightPopup';
import { useLocalStorage } from '../../lib/hooks';
import { Step } from '../../types';
import React, { useRef } from 'react';

type Props = {
  steps: Step[]
  category: string;
  onFinish: () => void;
}

export default function StepCategory({ steps, category, onFinish }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useLocalStorage<number>({
    method: 'get',
    key: category + 'active-step',
  });

  const stepIndex = Number(currentStepIndex) || 0;

  if (stepIndex >= steps.length) return null;

  const currentStep = steps[stepIndex];

  const handleNext = () => {
    setCurrentStepIndex(stepIndex + 1);
  };

  if (stepIndex === steps.length - 1) {
    onFinish();
  }

  const ref = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  useHighlightPopup({ currentStep, ref, onNext: handleNext });

  return (
    <div
      className={
        'highlight-wrapper ' +
        (currentStepIndex === steps.length - 1 ? 'finished' : '')
      }
    >
      <div className="step-info">
        <span>
          Step {stepIndex + 1} / {steps.length}
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
          ref={nextRef}
        >
          Next
        </button>
      </div>
    </div>
  );
}
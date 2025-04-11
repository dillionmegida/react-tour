import React, { useState, useRef } from 'react';
import useHighlightPopup from '../../hooks/useHighlightPopup';
import { Step } from '../../types/Step';
import './Highlight.scss';

type Props = {
  steps: Step[];
  onFinish: () => void;
};

export default function Highlight({ steps, onFinish }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (currentStepIndex >= steps.length) return null;

  const currentStep = steps[currentStepIndex];

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => prev + 1);
    if (currentStepIndex === steps.length - 1) {
      onFinish();
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  useHighlightPopup({ currentStep, ref, nextRef });

  return (
    <div
      className={
        'highlight-wrapper ' +
        (currentStepIndex === steps.length - 1 ? 'finished' : '')
      }
    >
      <div className="step-info">
        <span>
          Step {currentStepIndex + 1} / {steps.length}
        </span>
      </div>
      <div className="highlight" ref={ref}></div>
      <div className="highlight-content">{currentStep.content}</div>
      <div className="highlight-actions">
        {currentStepIndex > 0 && (
          <button
            className="highlight-prev-btn"
            onClick={handlePrevious}
            ref={nextRef}
          >
            Previous
          </button>
        )}
        <button
          className="highlight-next-btn"
          onClick={handleNext}
          ref={nextRef}
        >
          Next
        </button>
      </div>
    </div>
  );
}

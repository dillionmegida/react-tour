import { useLocalStorage, useTourPopup } from '../../lib/hooks';
import { Step } from '../../types';
import { useRef, useEffect } from 'react';
import { capitalize } from '../../lib/utils';
import { getActiveStepKey } from '../../lib/constants';
import './TourCategory.scss';

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
  useTourPopup({ currentStep, ref, onNext: handleNext });

  if (stepIndex >= steps.length) return null;

  return (
    <div
      className={
        'tour-wrapper ' +
        (currentStepIndex === steps.length - 1 ? 'finished' : '')
      }
    >
      <div className="tour-step-info">
        <span>
          {capitalize(category)} - Step {stepIndex + 1} / {steps.length}
        </span>
      </div>

      {/* this element allows us to adjust the position of the parent
      element, which is tour-wrapper */}
      <div className="tour" ref={ref}></div>
      
      <div className="tour-content">{currentStep.content}</div>
      <div className="tour-actions">
        <button
          className={
            'tour-next-btn ' + (currentStep.nextOn ? 'disabled' : '')
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

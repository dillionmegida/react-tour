import { render, screen, act } from '@testing-library/react';
import { Tour } from '../Tour';

describe('Tour Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div class="step-1"></div>
    `;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockSteps = {
    onboarding: [
      {
        target: '.step-1',
        content: 'This is step 1',
      },
    ],
  };

  test('shows after specified delay', () => {
    const TIME_TO_DELAY = 1000
    render(<Tour stepObj={mockSteps} delayToShow={TIME_TO_DELAY} />);
    
    // Initially not visible
    expect(screen.queryByText('This is step 1')).not.toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(TIME_TO_DELAY);
    });
    
    // Should now be visible
    expect(screen.getByText('This is step 1')).toBeInTheDocument();
  });

  test('shows immediately when no delay is specified', () => {
    const TIME_TO_DELAY = 0
    render(<Tour stepObj={mockSteps} delayToShow={TIME_TO_DELAY} />);

    act(() => {
      jest.advanceTimersByTime(TIME_TO_DELAY);
    })
    
    expect(screen.getByText('This is step 1')).toBeInTheDocument();
  });
});

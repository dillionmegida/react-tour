import { render, screen } from '@testing-library/react';
import { TourCategory } from '../TourCategory';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Step } from '@/types';

type TourCategoryProps = {
  category: string;
  steps: Step[];
  onFinish: () => void;
};

const mockStepsAllWithNextOn: Step[] = [
  {
    content: 'First step content',
    target: '#target-1',
    nextOn: 'click',
  },
  {
    content: 'Second step content',
    target: '#target-2',
    nextOn: { event: 'click', target: '#next-button' },
  },
];

describe('TourCategory', () => {
  const mockStepsAllWithoutNextOn: Step[] = [
    {
      content: 'First step content',
      target: '#target-1',
    },
    {
      content: 'Second step content',
      target: '#target-2',
    },
  ];

  const mockPropsAllWithNextOn: TourCategoryProps = {
    category: 'test',
    steps: mockStepsAllWithNextOn,
    onFinish: jest.fn(),
  };

  const mockPropsAllWithoutNextOn: TourCategoryProps = {
    category: 'test',
    steps: mockStepsAllWithoutNextOn,
    onFinish: jest.fn(),
  };

  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();

    // Set up our document body
    document.body.innerHTML = `
      <div id="target-1"></div>
      <div id="target-2"></div>
      <button id="next-button"></button>
    `;
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('renders the first step content', () => {
    render(<TourCategory {...mockPropsAllWithNextOn} />);

    // TODO: pass translations to this component, so that you can use
    // Step instead of step (the translation keys) for the test to passes
    expect(screen.getByText('Test - step 1 / 2')).toBeInTheDocument();
    expect(screen.getByText('First step content')).toBeInTheDocument();
    expect(screen.getByText('skip')).toBeInTheDocument();
  });

  it('shows next button when nextOn is not defined', () => {
    // Test with first step (no nextOn)
    render(<TourCategory {...mockPropsAllWithoutNextOn} />);

    expect(screen.getByText('next')).toBeInTheDocument();
  });

  it('hides next button when nextOn is defined', () => {
    render(<TourCategory {...mockPropsAllWithNextOn} />);
    expect(screen.queryByText('next')).not.toBeInTheDocument();
  });

  it('calls onFinish when skip button is clicked', async () => {
    const user = userEvent.setup();
    render(<TourCategory {...mockPropsAllWithNextOn} />);

    await user.click(screen.getByText('skip'));
    expect(mockPropsAllWithNextOn.onFinish).toHaveBeenCalled();
  });
});

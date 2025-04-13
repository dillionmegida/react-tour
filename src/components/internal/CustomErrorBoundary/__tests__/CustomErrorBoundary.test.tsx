import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomErrorBoundary } from '..';

describe('CustomErrorBoundary', () => {
  it('shows fallback UI when component throws error', () => {
    // Mock console.error to avoid test noise
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Create a component that throws
    const ErrorComponent = () => {
      throw new Error('A thrown test error');
    };

    render(
      <CustomErrorBoundary title="Something went wrong">
        <ErrorComponent />
      </CustomErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('A thrown test error')).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore();
  });

  it('renders children when no error occurs', () => {
    const GoodComponent = () => <div>Working component</div>;

    render(
      <CustomErrorBoundary title="Another Test error">
        <GoodComponent />
      </CustomErrorBoundary>
    );

    expect(screen.getByText('Working component')).toBeInTheDocument();
    expect(screen.queryByText('Another Test error')).not.toBeInTheDocument();
  });
});

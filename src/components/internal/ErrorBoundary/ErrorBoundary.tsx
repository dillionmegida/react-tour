import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from '../..';

interface Props {
  children: ReactNode;
  readableMessage: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  showError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    showError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  public handleClose = () => {
    this.setState({ showError: false });
  };

  public render() {
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) return <></>;

    if (this.state.hasError && this.state.showError) {
      return (
        this.props.fallback || (
          <ErrorDisplay
            message={this.state.error?.message || ''}
            title={this.props.readableMessage}
            onClose={this.handleClose}
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

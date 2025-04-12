import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.scss';

interface Props {
  children: ReactNode;
  readableMessage: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) return <></>;

    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-boundary">
            <p className="error-message__title">{this.props.readableMessage}</p>
            {this.state.error && <p className="error-message">{this.state.error.message}</p>}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

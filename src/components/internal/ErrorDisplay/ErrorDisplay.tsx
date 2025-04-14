import './ErrorDisplay.scss';

type ErrorDisplayProps = {
  message: string;
  title?: string;
  onClose: () => void;
};

export function ErrorDisplay({
  message,
  title = 'Error',
  onClose,
}: ErrorDisplayProps) {
  return (
    <div className="error-display">
      <button
        type="button"
        className="error-display__close"
        onClick={onClose}
        aria-label="Close error message"
      >
        ×
      </button>
      <h3 className="error-display__title">{title}</h3>
      <p
        className="error-display__message"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
}

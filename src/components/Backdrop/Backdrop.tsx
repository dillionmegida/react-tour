import { createPortal } from 'react-dom';
import './Backdrop.scss';

export function Backdrop() {
  return createPortal(<div className="tour-backdrop" />, document.body);
}

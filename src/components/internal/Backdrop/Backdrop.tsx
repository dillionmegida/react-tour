import { createPortal } from 'react-dom';
import './Backdrop.scss';
import { BACKDROP_Z_INDEX } from '@/lib/constants';

export function Backdrop() {
  return createPortal(<div className="tour-backdrop" style={{ zIndex: BACKDROP_Z_INDEX }} />, document.body);
}

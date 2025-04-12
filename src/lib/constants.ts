export const TOUR_CATEGORIES_STORAGE_KEY = 'tour-categories';
export function getActiveStepKey(category: string) {
  return `${category}-active-step`;
}

export const BACKDROP_Z_INDEX = 10;
export const TOUR_WRAPPER_Z_INDEX = 20;
export const TOUR_TARGET_Z_INDEX = 30;
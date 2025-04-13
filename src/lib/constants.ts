export const TOUR_CATEGORIES_STORAGE_KEY = 'tour-categories';
export function getActiveStepKey(category: string) {
  return `${category}-active-step`;
}
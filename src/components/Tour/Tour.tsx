import { useEffect, useState } from 'react';
import { StepObj } from '../../types';
import TourCategory from './TourCategory';
import {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
} from '../../lib/utils';
import {
  getActiveStepKey,
  TOUR_CATEGORIES_STORAGE_KEY,
} from '../../lib/constants';
import { CategoryStatusObj } from '../../types';
import { Backdrop } from '../';
import { ErrorBoundary } from '../';

type Props = {
  stepObj: StepObj;
};

export function Tour({ stepObj }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [unfinishedCategories, setUnfinishedCategories] = useState<string[]>([]);

  const activeCategory =
    activeCategoryIndex !== null
      ? unfinishedCategories[activeCategoryIndex]
      : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTour(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTour) return;

    const stepCategories: string[] = Object.keys(stepObj);
    const categoriesStatus =
      getLocalStorage<CategoryStatusObj>(TOUR_CATEGORIES_STORAGE_KEY) || {};
    const unfinishedCategories: string[] = [];

    for (const category of stepCategories) {
      if (
        !categoriesStatus[category] ||
        categoriesStatus[category] !== 'finished'
      ) {
        // then this category is not started
        categoriesStatus[category] = 'in-progress';
        unfinishedCategories.push(category);
      }
    }

    setLocalStorage(TOUR_CATEGORIES_STORAGE_KEY, categoriesStatus);
    setUnfinishedCategories(unfinishedCategories);
    setActiveCategoryIndex(0);
  }, [showTour]);

  const onFinishCategory = () => {
    if (activeCategoryIndex === null || !activeCategory) return;

    const categoriesStatus =
      getLocalStorage<CategoryStatusObj>(TOUR_CATEGORIES_STORAGE_KEY) || {};
    categoriesStatus[activeCategory] = 'finished';
    setLocalStorage(TOUR_CATEGORIES_STORAGE_KEY, categoriesStatus);
    deleteLocalStorage(getActiveStepKey(activeCategory));
    setActiveCategoryIndex(activeCategoryIndex + 1);
  };

  return showTour && activeCategory ? (
    <ErrorBoundary readableMessage="Something went wrong with the Tour component">
      <>
        <Backdrop />
        <TourCategory
          category={activeCategory}
          key={activeCategory}
          steps={stepObj[activeCategory]}
          onFinish={onFinishCategory}
        />
      </>
    </ErrorBoundary>
  ) : null;
}

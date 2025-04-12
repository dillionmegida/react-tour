import { useEffect, useState } from 'react';
import { StepObj } from '../../types';
import TourCategory from './TourCategory';
import {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
} from '../../lib/utils';
import { getActiveStepKey, TOUR_CATEGORIES_STORAGE_KEY } from '../../lib/constants';
import { CategoryStatusObj } from '../../types';

type Props = {
  stepObj: StepObj;
};

export function Tour({ stepObj }: Props) {
  const stepCategories: string[] = Object.keys(stepObj);
  const [unfinishedCategories, setUnfinishedCategories] = useState<string[]>(
    []
  );
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    0
  );

  const activeCategory =
    activeCategoryIndex !== null
      ? unfinishedCategories[activeCategoryIndex]
      : null;

  useEffect(() => {
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
  }, []);

  const onFinishCategory = () => {
    if (activeCategoryIndex === null || !activeCategory) return;

    const categoriesStatus =
      getLocalStorage<CategoryStatusObj>(TOUR_CATEGORIES_STORAGE_KEY) || {};
    categoriesStatus[activeCategory] = 'finished';
    setLocalStorage(TOUR_CATEGORIES_STORAGE_KEY, categoriesStatus);
    deleteLocalStorage(getActiveStepKey(activeCategory));
    setActiveCategoryIndex(activeCategoryIndex + 1);
  };

  return activeCategory ? (
    <TourCategory
      category={activeCategory}
      key={activeCategory}
      steps={stepObj[activeCategory]}
      onFinish={onFinishCategory}
    />
  ) : null;
}

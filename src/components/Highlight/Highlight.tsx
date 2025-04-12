import React from 'react';
import { StepObj } from '../../types';
import './Highlight.scss';
import StepCategory from './Category';
import { useLocalStorage } from '../../lib/hooks';

type Props = {
  stepObj: StepObj;
};

export default function Highlight({ stepObj }: Props) {
  const stepCategories: string[] = Object.keys(stepObj);

  const categoriesStatusInProgressByDefault: {
    [category: string]: 'finished' | 'in-progress';
  } = {};

  for (const category of stepCategories) {
    categoriesStatusInProgressByDefault[category] = 'in-progress';
  }

  const [categoriesStatus, setCategoriesStatus] = useLocalStorage<{
    [category: string]: 'finished' | 'in-progress';
  }>({
    method: 'get',
    key: 'tour-categories',
    defaultValue: categoriesStatusInProgressByDefault,
  });

  const unfinishedCategories = categoriesStatus
    ? stepCategories.filter((category) => {
        return (
          !categoriesStatus[category] ||
          categoriesStatus[category] !== 'finished'
        );
      })
    : stepCategories;

  return unfinishedCategories.map((category) => (
    <StepCategory
      onFinish={() => {
        setCategoriesStatus({
          ...categoriesStatus,
          [category]: 'finished',
        });
      }}
      category={category}
      key={category}
      steps={stepObj[category]}
    />
  ));
}

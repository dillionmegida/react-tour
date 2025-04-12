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

  const [categoriesStatus, setCategoriesStatus] = useLocalStorage<
    { [category: string]: 'finished' | 'in-progress' }
  >({
    method: 'get',
    key: 'tour-categories',
    value: {},
    defaultValue: stepCategories.map((acc, category) => ({
      ...acc,
      [category]: 'in-progress',
    }), {}),
  });


  const unfinishedCategories = categoriesStatus
    ? stepCategories.filter((category) => {
        return !categoriesStatus[category] || categoriesStatus[category] !== 'finished';
      })
    : stepCategories;

  return unfinishedCategories.map((category) => (
    <StepCategory
      onFinish={() => {
        setCategoriesStatus((prev) => ({
          ...prev,
          [category]: 'finished',
        }));
      }}
      category={category}
      key={category}
      steps={stepObj[category]}
    />
  ));
}

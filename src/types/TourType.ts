import { ReactNode } from 'react';

export type Step = {
  target: string;
  content: ReactNode;
  nextOn?:
    | string
    | {
        event: string;
        target: string;
      };
};

export type CategoryStatus = 'finished' | 'in-progress';

export type CategoryStatusObj = { [id: string]: CategoryStatus };

export type StepObj = { [id: string]: Step[] };

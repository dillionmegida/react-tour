import { ReactNode } from "react"

export type Step = {
  target: string,
  content: ReactNode
  nextOn?: 'click'
}

export type CategoryStatus = 'finished' | 'in-progress';

export type CategoryStatusObj = {[id: string]: CategoryStatus};

export type StepObj = {[id: string]: Step[]}
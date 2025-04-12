import { ReactNode } from "react"

export type Step = {
  target: string,
  content: ReactNode
  nextOn?: 'click'
}

export type StepObj = {[id: string]: Step[]}
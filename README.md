# React Tour

This is a customizable React component for creating guided tours in your applications.

## Installation

```bash
npm install @dillionmegida/react-tour
```

## Usage

```jsx
import { Tour } from '@dillionmegida/react-tour';

<Tour stepObj={stepObj} />
```

Example of [stepObj][1]:

```jsx
const stepObj = { 
  onboarding: [
    {
      target: 'header',
      content: 'This is a tour',
      nextOn: 'click',
    },
    {
      target: '.step-1',
      content: 'This is a tour',
    },
  ],
  'feature-customization': [
    {
      target: '.customization__step-1',
      content: 'This is a tour',
    },
  ],
};
```

Each key is a unique tour category, and the value is an array of steps:

* `target` (required): The target DOM element to highlight
* `content` (required): The content to display in the tour step
* `nextOn` (optional): Specify when the next step should be triggered
  * by default, there's a "next" button on each step, but with `nextOn`, you can say "when the user clicks on the target, go to the next step"
  * when this is specified, the "next" button will be hidden

## Things to note

### Put the component at the root

The tour component is `absolute` positioned. Using fixed would mean that the tour component doesn't flow with the target element when the screen is resized, or we would have to use JavaScript to position the tour component relative to the target element on every resize. With `absolute`, the tour component is not affected by screen size changes. That means, put the tour component at the root. Or ensure that the tour component is not inside a relative container.

[1]: src/types/Tour.ts
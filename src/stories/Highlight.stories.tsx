import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Highlight } from '..';
import './stories-global.css';

const meta = {
  title: 'Components/Highlight',
  component: Highlight,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ minHeight: '100vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Highlight>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
// };

// Full page example
export const FullPageExample: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    stepObj: {
      onboarding: [
        {
          target: 'header',
          content: 'This is a highlight',
        },
        {
          target: '.step-1',
          content: 'This is a highlight',
        },
        {
          target: '.hello',
          content:
            'This is a highlight. This is a highlight. This is a highlight. This is a highlight. This is a highlight',
        },
        // {
        //   target: '.step-2',
        //   content: 'This is a highlight',
        // },
        // {
        //   target: '.step-3',
        //   content: 'This is a highlight',
        // },
        {
          target: '.step-4',
          content: 'This is a highlight',
        },
        {
          target: '.finish-paying-btn',
          content: (
            <p>
              When you click this button, your payment will be processed and
              then we can get back to you with further details on what next to
              do. <b>Click to proceed.</b>
            </p>
          ),
          nextOn: 'click',
        },
        {
          target: '.footer',
          content: 'This is a highlight',
        },
      ],
    },
  },
  render: ({ stepObj }) => (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h1>My App</h1>
      </header>
      <main
        style={{
          flex: 1,
          padding: '2rem',
        }}
      >
        <Highlight stepObj={stepObj} />
        <h2 className="step-1">Step 1</h2>
        <div
          className="hello"
          style={{
            width: '200px',
            height: '200px',
            overflow: 'hidden',
            backgroundColor: 'green',
          }}
        >
          <img
            style={{ width: '100%', objectFit: 'cover' }}
            src="https://dillionmegida.com/img/deee.png"
          />
        </div>
        <h2 className="step-2">Step 2</h2>
        <h2 className="step-3">Step 3</h2>
        <button
          style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}
          className="finish-paying-btn"
        >
          Finish paying
        </button>
        <h2 className="step-4">Step 4</h2>
      </main>
      <footer
        className="footer"
        style={{
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #ddd',
        }}
      >
        Footer content
      </footer>
      {/* add some divs with some spaces */}
      <div style={{ height: '500px' }}></div>
      <div style={{ height: '500px' }}></div>
      <div style={{ height: '500px' }}></div>
    </div>
  ),
};

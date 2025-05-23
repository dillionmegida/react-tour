import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tour } from '..';
import './stories-global.css';
import en from '../translations/en/common.json';
import fr from '../translations/fr/common.json';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const meta = {
  title: 'Components/Tour',
  component: Tour,
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
} satisfies Meta<typeof Tour>;

export default meta;
type Story = StoryObj<typeof meta>;

// Full page example
export const FullPageExample: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    delayToShow: 0,
    stepObj: {
      onboarding: [
        {
          target: 'header',
          content: 'This is a tour',
        },
        {
          target: '.step-1',
          content: 'This is a tour',
        },
        {
          target: '.hello',
          content:
            'This is a tour. This is a tour. This is a tour. This is a tour. This is a tour',
        },
        {
          target: '.step-4',
          content: 'This is a tour',
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
          nextOn: {
            event: 'click',
            target: '.finish-paying-btn',
          },
        },
        {
          target: '.footer',
          content: 'This is a tour',
        },
      ],
      feature: [
        {
          target: 'header',
          content: 'This is a tour',
        },
        {
          target: '.step-1',
          content: 'This is a tour',
        },
        {
          target: '.hello',
          content:
            'This is a tour. This is a tour. This is a tour. This is a tour. This is a tour',
        },
        {
          target: '.step-4',
          content: 'This is a tour',
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
          content: 'This is a tour',
        },
      ],
    },
  },
  render: (props) => (
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
        <I18nextProvider i18n={i18n}>
          <Tour {...props} />
        </I18nextProvider>
        <h2 className="step-1">Step 1</h2>
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <div
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
          <div
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
          <div
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

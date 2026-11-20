import {createRoot} from 'react-dom/client';
import {PostHogProvider} from '@posthog/react';
import App from './App.tsx';
import './index.css';

const posthogKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const posthogOptions = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-08-30',
} as const;

const app = posthogKey ? (
  <PostHogProvider apiKey={posthogKey} options={posthogOptions}>
    <App />
  </PostHogProvider>
) : (
  <App />
);

createRoot(document.getElementById('root')!).render(app);

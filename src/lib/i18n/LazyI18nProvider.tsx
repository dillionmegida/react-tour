import { Suspense, lazy } from 'react';
import type { PropsWithChildren } from 'react';

export function LazyI18nProvider({ children }: PropsWithChildren) {
  const I18nProvider = lazy(() => import('./i18nSetup'));

  return (
    <Suspense fallback={null}>
      <I18nProvider>{children}</I18nProvider>
    </Suspense>
  );
}

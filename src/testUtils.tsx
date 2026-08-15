import { SWRConfig } from 'swr';
import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

export function renderWithSWR(ui: ReactElement) {
  return render(
    <SWRConfig
      value={{
        provider: () => new Map(),
        dedupingInterval: 0,
        loadingTimeout: 0,
        shouldRetryOnError: false,
      }}
    >
      {ui}
    </SWRConfig>,
  );
}

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Mock API responses for testing
export const mockApiResponses = {
  health: {
    success: { status: 'api healthy' },
    error: new Error('Network error'),
  },
  workerStatus: {
    running: { status: 'running', thread_id: 12345 },
    stopped: { status: 'stopped' },
  },
  workerStart: {
    success: { status: 'worker started' },
    alreadyRunning: { status: 'worker already running' },
  },
  workerStop: {
    success: { status: 'worker stopped' },
    notRunning: { status: 'worker not running' },
  },
};

// Custom render function that wraps components with providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

// Mock fetch for tests
export function mockFetch(response: any, status: number = 200) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
    } as Response)
  );
}

// Mock axios for tests
export function mockAxios(mockApi: any) {
  jest.mock('@/utils/apiService', () => ({
    __esModule: true,
    default: mockApi,
  }));
}

// Wait for async updates
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Create mock API service
export function createMockApiService(overrides?: Partial<any>) {
  return {
    apiHealth: jest.fn().mockResolvedValue({ data: mockApiResponses.health.success }),
    getWorkerStatus: jest.fn().mockResolvedValue({ data: mockApiResponses.workerStatus.stopped }),
    startWorker: jest.fn().mockResolvedValue({ data: mockApiResponses.workerStart.success }),
    stopWorker: jest.fn().mockResolvedValue({ data: mockApiResponses.workerStop.success }),
    ...overrides,
  };
}

export * from '@testing-library/react';

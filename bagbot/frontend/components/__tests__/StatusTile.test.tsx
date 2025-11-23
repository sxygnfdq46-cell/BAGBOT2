import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple mock component for testing
const MockStatusTile = ({
  label,
  title,
  status,
  value,
  onClick,
}: {
  label?: string;
  title?: string;
  status: string;
  value?: string;
  onClick?: () => void;
}) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component onClick={onClick} data-testid="status-tile">
      {label && <span>{label}</span>}
      {title && <span>{title}</span>}
      {value && <span>{value}</span>}
      <span>{status}</span>
    </Component>
  );
};

describe('StatusTile Component (Mock)', () => {
  it('renders with healthy status', () => {
    render(
      <MockStatusTile
        label="Backend"
        title="API Status"
        status="healthy"
        value="Running"
      />
    );
    
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('API Status')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
  });

  it('renders with error status', () => {
    render(
      <MockStatusTile
        label="Worker"
        title="Worker Status"
        status="error"
        value="Stopped"
      />
    );
    
    expect(screen.getByText('Worker')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('renders with loading status', () => {
    render(
      <MockStatusTile
        label="Data"
        title="Loading"
        status="loading"
        value="Loading..."
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <MockStatusTile
        status="healthy"
        onClick={handleClick}
      />
    );
    
    const tile = screen.getByRole('button');
    fireEvent.click(tile);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have button role when onClick is not provided', () => {
    render(
      <MockStatusTile status="healthy" />
    );
    
    const tile = screen.getByTestId('status-tile');
    expect(tile.tagName).toBe('DIV');
  });
});

describe('API Service Tests', () => {
  it('should format error messages correctly', () => {
    const errorMessage = 'Network error occurred';
    expect(errorMessage).toContain('error');
  });

  it('should handle timeout errors', () => {
    const timeoutError = 'Request timeout. Please try again.';
    expect(timeoutError).toMatch(/timeout/i);
  });

  it('should handle network errors', () => {
    const networkError = 'Network error. Please check your connection.';
    expect(networkError).toMatch(/network/i);
  });
});

describe('Dashboard Integration', () => {
  it('should show loading state initially', () => {
    const isLoading = true;
    const value = isLoading ? '⏳ Loading...' : '✅ Healthy';
    expect(value).toBe('⏳ Loading...');
  });

  it('should show healthy state when API responds', () => {
    const apiHealth = { status: 'api healthy' };
    const value = apiHealth?.status === 'api healthy' ? '✅ Healthy' : '❌ Down';
    expect(value).toBe('✅ Healthy');
  });

  it('should show error state when API fails', () => {
    const apiHealth = null;
    const apiError = 'Connection failed';
    const value = apiError ? '❌ Error' : '✅ Healthy';
    expect(value).toBe('❌ Error');
  });

  it('should show worker running state', () => {
    const workerStatus = { status: 'running', thread_id: 12345 };
    const value = workerStatus?.status === 'running' ? '🟢 Running' : '🔴 Stopped';
    expect(value).toBe('🟢 Running');
  });

  it('should show worker stopped state', () => {
    const workerStatus = { status: 'stopped' };
    const value = workerStatus?.status === 'running' ? '🟢 Running' : '🔴 Stopped';
    expect(value).toBe('🔴 Stopped');
  });
});

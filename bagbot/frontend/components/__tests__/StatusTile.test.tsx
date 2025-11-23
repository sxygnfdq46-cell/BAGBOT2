import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusTile from '../StatusTile';

describe('StatusTile Component', () => {
  it('renders with healthy status', () => {
    render(
      <StatusTile
        label="Backend"
        title="API Status"
        status="healthy"
        value="Running"
        subtitle="All systems operational"
      />
    );
    
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('API Status')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  it('renders with error status', () => {
    render(
      <StatusTile
        label="Worker"
        title="Worker Status"
        status="error"
        value="Stopped"
      />
    );
    
    expect(screen.getByText('Worker')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
  });

  it('renders with loading status', () => {
    render(
      <StatusTile
        label="Data"
        title="Loading"
        status="loading"
        value="Loading..."
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with warning status', () => {
    render(
      <StatusTile
        label="Connection"
        title="Connection Status"
        status="warning"
        value="Reconnecting"
      />
    );
    
    expect(screen.getByText('Reconnecting')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <StatusTile
        status="healthy"
        className="custom-class"
      />
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('displays last updated time when provided', () => {
    const lastUpdated = new Date('2024-01-01T12:00:00Z');
    render(
      <StatusTile
        status="healthy"
        lastUpdated={lastUpdated}
      />
    );
    
    // Check if the last updated time is displayed (exact format may vary)
    expect(screen.getByText(/Updated/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked and clickable', () => {
    const handleClick = jest.fn();
    render(
      <StatusTile
        status="healthy"
        onClick={handleClick}
      />
    );
    
    const tile = screen.getByRole('button');
    tile.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

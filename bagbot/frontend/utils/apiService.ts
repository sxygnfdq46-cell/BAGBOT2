import apiClient, { apiCall, ApiResponse } from './api';

// Types for API responses
export interface HealthResponse {
  status: string;
  service?: string;
}

export interface WorkerStatusResponse {
  status: 'running' | 'stopped';
  thread_id?: number;
  uptime?: string;
}

export interface WorkerActionResponse {
  status: string;
}

export interface JobSubmission {
  job_type: string;
  payload: Record<string, any>;
}

export interface JobResponse {
  status: string;
  job_id: string;
}

export interface Trade {
  id: string;
  timestamp: string;
  pair: string;
  side: 'BUY' | 'SELL';
  price: number;
  amount: number;
  profit?: number;
  strategy?: string;
}

export interface TradesResponse {
  trades: Trade[];
}

export interface Signal {
  id: string;
  timestamp: string;
  pair: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  indicators?: Record<string, any>;
}

export interface SignalsResponse {
  signals: Signal[];
}

export interface Metrics {
  total_trades: number;
  win_rate: number;
  profit_today: number;
  active_positions: number;
  total_pnl: number;
  sharpe_ratio?: number;
  max_drawdown?: number;
}

export interface OptimizerRequest {
  data_file: string;
  objective: 'sharpe' | 'total_return' | 'win_rate';
  population: number;
  generations: number;
  seed?: number;
}

export interface OptimizerResponse {
  job_id: string;
  status: string;
}

export interface BacktestRequest {
  data_file: string;
  genome_file: string;
  initial_balance?: number;
  fee_rate?: number;
}

export interface BacktestResponse {
  job_id: string;
  status: string;
}

export interface ChartDataPoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartDataResponse {
  data: ChartDataPoint[];
}

// API Service Class
class ApiService {
  // Health endpoints
  async rootHealth(): Promise<ApiResponse<HealthResponse>> {
    return apiCall(apiClient.get('/'));
  }

  async apiHealth(): Promise<ApiResponse<HealthResponse>> {
    return apiCall(apiClient.get('/api/health'));
  }

  // Worker endpoints
  async getWorkerStatus(): Promise<ApiResponse<WorkerStatusResponse>> {
    return apiCall(apiClient.get('/api/worker/status'));
  }

  async startWorker(): Promise<ApiResponse<WorkerActionResponse>> {
    return apiCall(apiClient.post('/api/worker/start'));
  }

  async stopWorker(): Promise<ApiResponse<WorkerActionResponse>> {
    return apiCall(apiClient.post('/api/worker/stop'));
  }

  // Jobs endpoint
  async submitJob(job: JobSubmission): Promise<ApiResponse<JobResponse>> {
    return apiCall(apiClient.post('/jobs', job));
  }

  // Trading endpoints (planned - will return 501 for now)
  async getTrades(params?: { limit?: number; strategy?: string }): Promise<ApiResponse<TradesResponse>> {
    return apiCall(apiClient.get('/api/trades', { params }));
  }

  async getSignals(params?: { limit?: number }): Promise<ApiResponse<SignalsResponse>> {
    return apiCall(apiClient.get('/api/signals', { params }));
  }

  async getMetrics(): Promise<ApiResponse<Metrics>> {
    return apiCall(apiClient.get('/api/metrics'));
  }

  // Optimizer endpoint (planned)
  async runOptimizer(request: OptimizerRequest): Promise<ApiResponse<OptimizerResponse>> {
    return apiCall(apiClient.post('/api/optimizer/run', request));
  }

  // Backtest endpoint (planned)
  async runBacktest(request: BacktestRequest): Promise<ApiResponse<BacktestResponse>> {
    return apiCall(apiClient.post('/api/backtest/run', request));
  }

  // Chart data endpoint (planned)
  async getChartData(params: {
    pair: string;
    timeframe?: string;
    start?: string;
    end?: string;
  }): Promise<ApiResponse<ChartDataResponse>> {
    return apiCall(apiClient.get('/api/chart/data', { params }));
  }
}

// Export singleton instance
const api = new ApiService();
export default api;

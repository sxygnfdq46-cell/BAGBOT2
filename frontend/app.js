// API Base URL - adjust if your backend runs on different port
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const apiStatusEl = document.getElementById('api-status');
const workerStatusEl = document.getElementById('worker-status');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const statusBtn = document.getElementById('status-btn');
const logsEl = document.getElementById('logs');

// Utility function to add log messages
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    logsEl.appendChild(logEntry);
    logsEl.scrollTop = logsEl.scrollHeight;
}

// Update status display
function updateStatus(elementId, status, isHealthy = null) {
    const el = document.getElementById(elementId);
    el.textContent = status;
    
    // Color coding for status
    if (isHealthy === true) {
        el.style.backgroundColor = '#27ae60'; // Green
    } else if (isHealthy === false) {
        el.style.backgroundColor = '#e74c3c'; // Red
    } else {
        el.style.backgroundColor = '#95a5a6'; // Gray
    }
}

// API Functions
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        
        if (response.ok) {
            updateStatus('api-status', 'Healthy', true);
            addLog('API health check successful');
            return true;
        } else {
            throw new Error('API not healthy');
        }
    } catch (error) {
        updateStatus('api-status', 'Offline', false);
        addLog(`API health check failed: ${error.message}`, 'error');
        return false;
    }
}

async function checkWorkerStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/worker/status`);
        const data = await response.json();
        
        if (response.ok) {
            const status = data.status;
            const isRunning = status === 'running';
            updateStatus('worker-status', status.charAt(0).toUpperCase() + status.slice(1), isRunning ? true : null);
            addLog(`Worker status: ${status}`);
            return data;
        } else {
            throw new Error('Failed to get worker status');
        }
    } catch (error) {
        updateStatus('worker-status', 'Error', false);
        addLog(`Worker status check failed: ${error.message}`, 'error');
        return null;
    }
}

async function startWorker() {
    try {
        addLog('Starting worker...');
        const response = await fetch(`${API_BASE_URL}/api/worker/start`, {
            method: 'POST'
        });
        const data = await response.json();
        
        if (response.ok) {
            addLog(`Worker start response: ${data.status}`);
            setTimeout(checkWorkerStatus, 1000); // Check status after 1 second
        } else {
            throw new Error('Failed to start worker');
        }
    } catch (error) {
        addLog(`Failed to start worker: ${error.message}`, 'error');
    }
}

async function stopWorker() {
    try {
        addLog('Stopping worker...');
        const response = await fetch(`${API_BASE_URL}/api/worker/stop`, {
            method: 'POST'
        });
        const data = await response.json();
        
        if (response.ok) {
            addLog(`Worker stop response: ${data.status}`);
            setTimeout(checkWorkerStatus, 1000); // Check status after 1 second
        } else {
            throw new Error('Failed to stop worker');
        }
    } catch (error) {
        addLog(`Failed to stop worker: ${error.message}`, 'error');
    }
}

// Event Listeners
startBtn.addEventListener('click', startWorker);
stopBtn.addEventListener('click', stopWorker);
statusBtn.addEventListener('click', checkWorkerStatus);

// Initial status check and periodic updates
async function initialize() {
    addLog('Initializing dashboard...');
    await checkAPIHealth();
    await checkWorkerStatus();
    
    // Check status every 30 seconds
    setInterval(async () => {
        await checkAPIHealth();
        await checkWorkerStatus();
    }, 30000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initialize);
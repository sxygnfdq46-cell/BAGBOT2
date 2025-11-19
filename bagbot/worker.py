#!/usr/bin/env python3
"""
Simple entry point for the worker service on Render.
This allows Render to easily find and run the worker.
"""

if __name__ == "__main__":
    from api.run_worker import create_stop_event, run_loop
    import sys
    
    print("Starting bagbot worker...")
    stop_event = create_stop_event()
    
    try:
        run_loop(stop_event)
    except KeyboardInterrupt:
        print("\nShutting down worker...")
        stop_event.set()
    except Exception as e:
        print(f"Worker error: {e}")
        sys.exit(1)
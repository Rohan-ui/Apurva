// src/Clientcomponents/ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() { 
        if (this.state.hasError) {
            return (
                <div className="text-center py-12">
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
                    <button
                        className="mt-4 bg-primary text-white p-2 rounded"
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
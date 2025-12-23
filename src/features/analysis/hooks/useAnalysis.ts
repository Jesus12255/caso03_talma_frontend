import { useState, useCallback } from 'react';
import { analysisService, AnalysisResponse } from '../services/analysisService';

type AnalysisStatus = 'idle' | 'analyzing' | 'success' | 'error';

export function useAnalysis() {
    const [status, setStatus] = useState<AnalysisStatus>('idle');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [results, setResults] = useState<any>(null);
    const [thinking, setThinking] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const analyzeFiles = useCallback(async (files: File[]) => {
        setStatus('analyzing');
        setError(null);
        setThinking('Initiating analysis protocol...');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            // Simulation of "thinking" stream
            const toggleThinking = setInterval(() => {
                const thoughts = [
                    "Extracting semantic layers...",
                    "Analyzing structural patterns...",
                    "Correlating entities...",
                    "Validating data integrity...",
                    "Generating insights..."
                ];
                setThinking(prev => `${prev}\n> ${thoughts[Math.floor(Math.random() * thoughts.length)]}`);
            }, 800);

            const data: AnalysisResponse = await analysisService.analyzeDocuments(formData);

            clearInterval(toggleThinking);
            setResults(data);
            setStatus('success');
            setThinking('');
        } catch (err: unknown) {
            setStatus('error');
            const message = err instanceof Error ? err.message : 'Analysis failed';
            setError(message);
            // console.error(err);
        }
    }, []);

    const resetAnalysis = useCallback(() => {
        setStatus('idle');
        setResults(null);
        setThinking('');
        setError(null);
    }, []);

    return {
        status,
        results,
        thinking,
        error,
        analyzeFiles,
        resetAnalysis
    };
}

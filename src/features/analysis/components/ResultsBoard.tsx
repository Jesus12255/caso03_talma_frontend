import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, RefreshCw, Layers } from 'lucide-react';
import ResultCard, { AnalysisResultData } from './ResultCard';

interface ResultsBoardProps {
    results: AnalysisResultData[];
    onReset: () => void;
}

const ResultsBoard: React.FC<ResultsBoardProps> = ({ results, onReset }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedResult, setSelectedResult] = useState<any>(null); // To be typed later if detail view exists

    return (
        <div className="w-full max-w-7xl h-full flex flex-col">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onReset}
                        className="p-2 -ml-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Analysis Results
                            <span className="text-xs font-normal text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                {results?.length || 0} Documents
                            </span>
                        </h2>
                        <p className="text-sm text-zinc-500">Review extracted data and confidence scores</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Export All
                    </button>
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium shadow-lg shadow-indigo-900/20"
                    >
                        <RefreshCw className="w-4 h-4" />
                        New Analysis
                    </button>
                </div>
            </header>

            {!results || results.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 opacity-60">
                    <Layers className="w-16 h-16 mb-4 stroke-[1]" />
                    <p>No results available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    <AnimatePresence>
                        {results.map((result, idx) => (
                            <ResultCard
                                key={idx}
                                result={result}
                                index={idx}
                                onClick={() => setSelectedResult(result)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ResultsBoard;

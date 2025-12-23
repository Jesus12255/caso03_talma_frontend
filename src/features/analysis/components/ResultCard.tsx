import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export interface ResultField {
    label: string;
    value: string;
    section?: string;
}

export interface AnalysisResultData {
    fileName: string;
    detectedType: string;
    confidence: number;
    fields: ResultField[];
}

interface ResultCardProps {
    result: AnalysisResultData;
    index: number;
    onClick?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className="cursor-pointer group"
        >
            <SpotlightCard className="h-full bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                <div className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                                <FileText className="w-5 h-5 text-zinc-400 group-hover:text-tivit-red transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-medium text-zinc-200 text-sm line-clamp-1" title={result.fileName}>
                                    {result.fileName}
                                </h3>
                                <p className="text-xs text-zinc-500">{result.detectedType}</p>
                            </div>
                        </div>
                        <div className={`p-1.5 rounded-full ${result.confidence > 0.8 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {result.confidence > 0.8 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-4">
                        {result.fields.slice(0, 3).map((field, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                <span className="text-zinc-500 font-medium truncate max-w-[40%]">{field.label}</span>
                                <span className="text-zinc-300 truncate max-w-[55%]">{field.value}</span>
                            </div>
                        ))}
                        {result.fields.length > 3 && (
                            <p className="text-xs text-zinc-600 italic pt-2">
                                +{result.fields.length - 3} more fields detected
                            </p>
                        )}
                    </div>

                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
                        <div className="flex items-center gap-1 text-indigo-400 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            View Details <ChevronRight className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

export default ResultCard;

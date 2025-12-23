import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFiles = (newFiles: File[]): File[] => {
        const validFiles: File[] = [];
        const maxFileSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        newFiles.forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                setError(`File type not supported: ${file.name}`);
                setTimeout(() => setError(''), 3000);
            } else if (file.size > maxFileSize) {
                setError(`File too large (${(file.size / 1024 / 1024).toFixed(2)}MB): ${file.name}`);
                setTimeout(() => setError(''), 3000);
            } else {
                validFiles.push(file);
            }
        });

        return validFiles;
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = validateFiles(Array.from(e.dataTransfer.files));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = validateFiles(Array.from(e.target.files));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const handleUpload = () => {
        if (files.length > 0) {
            onFilesSelected(files);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 ease-out
                ${dragActive
                        ? "border-tivit-red bg-tivit-red/5 scale-[1.02] shadow-[0_0_30px_rgba(237,28,36,0.1)]"
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/30"
                    }
                ${files.length > 0 ? "h-auto p-6" : "h-64 flex flex-col items-center justify-center"}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    multiple
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                />

                <AnimatePresence>
                    {files.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center pointer-events-none p-6"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-tivit-red/30 shadow-lg">
                                <Upload className={`w-8 h-8 ${dragActive ? "text-tivit-red" : "text-zinc-500 group-hover:text-zinc-300"} transition-colors`} />
                            </div>
                            <p className="text-xl font-medium text-white mb-2">
                                Drop document here to analyze
                            </p>
                            <p className="text-sm text-zinc-500">
                                Supports PDF, Images, Word, Excel
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div className="w-full space-y-3 cursor-default" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-sm font-medium text-zinc-400">Selected Files ({files.length})</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFiles([]);
                                    }}
                                    className="text-xs text-tivit-red hover:text-red-400 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                                {files.map((file, idx) => (
                                    <motion.div
                                        key={`${file.name}-${idx}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 group/file hover:border-zinc-700 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center flex-shrink-0">
                                            <File className="w-5 h-5 text-zinc-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-zinc-200 truncate">{file.name}</p>
                                            <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(idx);
                                            }}
                                            className="p-2 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover/file:opacity-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpload();
                                }}
                                className="w-full py-3 mt-4 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 active:scale-[0.98]"
                            >
                                Start Analysis
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-2 text-red-500 text-sm font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;

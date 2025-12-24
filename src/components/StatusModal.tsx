import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, AlertCircle, Info } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ModalType = 'success' | 'error' | 'info';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: ModalType;
}

const cn = (...inputs: (string | undefined | null | false)[]) => {
    return twMerge(clsx(inputs));
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, title, message, type = 'success' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const config = {
        success: {
            icon: CheckCircle2,
            color: 'text-green-500',
            bgGlow: 'bg-green-500/20',
            button: 'bg-[#197202] hover:bg-green-700 shadow-green-500/20',
            ring: 'ring-green-500/50'
        },
        error: {
            icon: AlertCircle,
            color: 'text-red-500',
            bgGlow: 'bg-red-500/20',
            button: 'bg-red-600 hover:bg-red-700 shadow-red-500/20',
            ring: 'ring-red-500/50'
        },
        info: {
            icon: Info,
            color: 'text-blue-500',
            bgGlow: 'bg-blue-500/20',
            button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
            ring: 'ring-blue-500/50'
        }
    };

    const currentConfig = config[type];
    const Icon = currentConfig.icon;

    return (
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>

            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className={cn(
                "relative w-full max-w-sm bg-[#0A0A0A] border border-[#1B1818] rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 ease-out",
                isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            )}>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>


                <div className="mb-4 relative">
                    <div className={cn("absolute inset-0 blur-xl rounded-full opacity-50", currentConfig.bgGlow)} />
                    <Icon size={40} className={cn("relative z-10 drop-shadow-lg", currentConfig.color)} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed px-4">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className={cn(
                        "w-[50%] py-2.5 px-6 rounded-lg text-white font-medium shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
                        currentConfig.button
                    )}
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default StatusModal;

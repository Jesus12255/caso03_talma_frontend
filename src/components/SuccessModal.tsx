import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           
            <div
                className="absolute inset-0 bg-[black/60] backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-[#0A0A0A] border border-[#1B1818] rounded-2xl shadow-2xl transform transition-all scale-100 p-8 flex flex-col items-center text-center">
         
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

             
                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-tivit-red/20 blur-xl rounded-full" />
                    <CheckCircle2 size={64} className="text-tivit-red relative z-10" />
                </div>

                
                <h3 className="text-2xl font-bold text-white mb-2">
                    {title}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    {message}
                </p>

             
                <button
                    onClick={onClose}
                    className="w-full py-3 px-6 rounded-xl bg-tivit-red hover:bg-red-600 text-white font-medium shadow-lg shadow-tivit-red/20 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;

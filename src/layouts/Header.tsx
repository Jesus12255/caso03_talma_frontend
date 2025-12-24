import { Settings, HelpCircle, User, LogOut, Bell, Menu } from 'lucide-react';
import React from 'react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-tivit-dark/70 backdrop-blur-xl supports-[backdrop-filter]:bg-tivit-dark/50">
            <div className="w-full h-16 flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center w-8 h-8">
                            <div className="absolute inset-0 bg-tivit-red blur-lg opacity-20 rounded-full"></div>
                            <div className="relative w-1.5 h-6 bg-tivit-red rounded-full shadow-[0_0_15px_rgba(237,28,36,0.5)]"></div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                                TIVIT
                            </h1>
                            <span className="text-[10px] uppercase tracking-widest text-tivit-muted font-medium">
                                Intelligent Analysis
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex items-center gap-1">
                    <button className="flex items-center justify-center w-9 h-9 text-tivit-muted hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5" title="Notificaciones">
                        <Bell size={18} />
                    </button>

                    <button className="flex items-center justify-center w-9 h-9 text-tivit-muted hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5" title="Configuración">
                        <Settings size={18} />
                    </button>

                    <button className="flex items-center justify-center w-9 h-9 text-tivit-muted hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5" title="Ayuda">
                        <HelpCircle size={18} />
                    </button>

                    <div className="w-px h-5 bg-white/10 mx-2"></div>

                    <button className="flex items-center justify-center w-9 h-9 text-tivit-muted hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5" title="Perfil">
                        <User size={18} />
                    </button>
                    <button className="flex items-center justify-center w-9 h-9 text-tivit-muted hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5" title="Cerrar sesión">
                        <LogOut size={18} />
                    </button>
                </nav>
            </div>
        </header>
    );
}

import React from 'react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 w-full h-[72px] z-50 bg-white/85 backdrop-blur-xl border-b border-[#c3c6d7]/30">
        <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-8 h-full">
            <button 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#004ac6] via-[#1d4ed8] to-[#3b82f6] flex items-center justify-center text-white shadow-md shadow-[#004ac6]/20 transition-transform duration-200 group-hover:scale-105 shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 13l2 2 4-4" />
                </svg>
              </div>
              <span className="font-display-lg text-xl md:text-2xl font-bold text-[#004ac6] tracking-tight flex items-center gap-1.5">
                ResumeFlow <span className="text-[11px] font-bold bg-[#2563eb]/10 text-[#004ac6] px-1.5 py-0.5 rounded-md tracking-normal border border-[#004ac6]/20 leading-none">AI</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1.5 h-full">
              <button
                onClick={() => setActiveTab('landing')}
                className={`h-9 px-3.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'landing'
                    ? 'text-white bg-[#004ac6] font-bold shadow-sm'
                    : 'text-[#434655] bg-[#ededf9]/70 hover:text-[#004ac6] hover:bg-[#004ac6]/10'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Home Page</span>
              </button>
              {[
                { id: 'dashboard', label: 'Solutions' },
                { id: 'candidates', label: 'Candidates' },
                { id: 'utility', label: 'Utility Preview' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                    className={`h-9 px-3.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-white bg-[#004ac6] font-bold shadow-sm'
                        : 'text-[#434655] bg-[#ededf9]/70 hover:text-[#004ac6] hover:bg-[#004ac6]/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/bikram73/ResumeFlow_AI/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-[#191b23] text-white hover:bg-black px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>GitHub</span>
            </a>
            <button
              onClick={() => setActiveTab(activeTab === 'landing' ? 'dashboard' : 'landing')}
              className="bg-[#004ac6] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-[#1d4ed8] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{activeTab === 'landing' ? 'Launch App' : 'Main Website'}</span>
              <span className="material-symbols-outlined text-[18px]">
                {activeTab === 'landing' ? 'arrow_forward' : 'home'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-[#c3c6d7]/30 px-4 py-2 flex justify-around items-center z-50 shadow-lg">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex flex-col items-center ${activeTab === 'landing' ? 'text-[#004ac6]' : 'text-[#434655]'}`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-[#004ac6]' : 'text-[#434655]'}`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`flex flex-col items-center ${activeTab === 'candidates' ? 'text-[#004ac6]' : 'text-[#434655]'}`}
        >
          <span className="material-symbols-outlined text-xl">groups</span>
          <span className="text-[10px] font-bold">Candidates</span>
        </button>
        <button
          onClick={() => setActiveTab('utility')}
          className={`flex flex-col items-center ${activeTab === 'utility' ? 'text-[#004ac6]' : 'text-[#434655]'}`}
        >
          <span className="material-symbols-outlined text-xl">analytics</span>
          <span className="text-[10px] font-bold">Utilities</span>
        </button>
      </nav>
    </>
  );
};

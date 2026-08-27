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
      <header className="fixed top-0 w-full h-[72px] z-50 bg-white/80 backdrop-blur-xl border-b border-[#c3c6d7]/30 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="font-display-lg text-xl md:text-2xl font-bold text-[#004ac6] tracking-tight">
              ResumeFlow AI
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('landing')}
              className={`font-semibold text-sm transition-colors duration-200 ${
                activeTab === 'landing' ? 'text-[#004ac6] border-b-2 border-[#004ac6] py-1' : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Product
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`font-semibold text-sm transition-colors duration-200 ${
                activeTab === 'dashboard' ? 'text-[#004ac6] border-b-2 border-[#004ac6] py-1' : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Solutions (Dashboard)
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`font-semibold text-sm transition-colors duration-200 ${
                activeTab === 'candidates' ? 'text-[#004ac6] border-b-2 border-[#004ac6] py-1' : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab('utility')}
              className={`font-semibold text-sm transition-colors duration-200 ${
                activeTab === 'utility' ? 'text-[#004ac6] border-b-2 border-[#004ac6] py-1' : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Utility Preview
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            title="Notifications"
            onClick={() => setActiveTab('dashboard')}
            className="p-2 text-[#434655] hover:bg-[#ededf9] rounded-full transition-all"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button
            onClick={() => setActiveTab(activeTab === 'landing' ? 'dashboard' : 'landing')}
            className="bg-[#004ac6] text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            {activeTab === 'landing' ? 'Launch App' : 'Main Website'}
          </button>
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

import React from 'react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNewAnalysis?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onNewAnalysis }) => {
  return (
    <aside className="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 bg-[#f3f3fe]/80 backdrop-blur-lg border-r border-[#c3c6d7]/30 flex-col p-4 gap-2 z-40 hidden md:flex">
      <div className="mb-4 px-2 pt-2">
        <h2 className="font-headline-sm text-lg font-black text-[#004ac6]">Recruit Pro</h2>
        <p className="text-[11px] text-[#434655] uppercase tracking-widest font-bold opacity-75">Enterprise Tier</p>
      </div>

      <nav className="flex-1 space-y-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left font-semibold text-sm ${
            activeTab === 'dashboard'
              ? 'bg-[#2563eb]/15 text-[#004ac6]'
              : 'text-[#434655] hover:bg-[#e1e2ed]/40 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[#434655] hover:bg-[#e1e2ed]/40 rounded-xl transition-all hover:translate-x-1 text-left font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-xl">cloud_upload</span>
          <span>Upload</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[#434655] hover:bg-[#e1e2ed]/40 rounded-xl transition-all hover:translate-x-1 text-left font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-xl">psychology</span>
          <span>Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left font-semibold text-sm ${
            activeTab === 'candidates'
              ? 'bg-[#2563eb]/15 text-[#004ac6]'
              : 'text-[#434655] hover:bg-[#e1e2ed]/40 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined text-xl">groups</span>
          <span>Candidates</span>
        </button>

        <button
          onClick={() => setActiveTab('utility')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left font-semibold text-sm ${
            activeTab === 'utility'
              ? 'bg-[#2563eb]/15 text-[#004ac6]'
              : 'text-[#434655] hover:bg-[#e1e2ed]/40 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined text-xl">analytics</span>
          <span>Reports & Utility</span>
        </button>

        <button
          onClick={() => setActiveTab('utility')}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[#434655] hover:bg-[#e1e2ed]/40 rounded-xl transition-all hover:translate-x-1 text-left font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>Settings</span>
        </button>
      </nav>

      <button
        onClick={onNewAnalysis || (() => setActiveTab('dashboard'))}
        className="mt-4 bg-[#712ae2] text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#712ae2]/20"
      >
        <span className="material-symbols-outlined text-[20px]">add_circle</span>
        <span>New Analysis</span>
      </button>

      <div className="mt-auto space-y-1 pt-3 border-t border-[#c3c6d7]/30">
        <button 
          onClick={() => alert('Theme toggle active')} 
          className="w-full flex items-center gap-3 px-3 py-2 text-[#434655] hover:bg-[#e1e2ed]/40 rounded-xl transition-all text-sm font-medium"
        >
          <span className="material-symbols-outlined text-xl">dark_mode</span>
          <span>Theme Toggle</span>
        </button>
        <button 
          onClick={() => alert('ResumeFlow AI Help & Knowledge Base')} 
          className="w-full flex items-center gap-3 px-3 py-2 text-[#434655] hover:bg-[#e1e2ed]/40 rounded-xl transition-all text-sm font-medium"
        >
          <span className="material-symbols-outlined text-xl">help</span>
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
};

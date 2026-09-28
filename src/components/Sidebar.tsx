import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNewAnalysis?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onNewAnalysis }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('rf_theme') === 'dark';
  });
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [activeSubItem, setActiveSubItem] = useState<string>('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rf_theme', 'light');
    }
  }, [isDarkMode]);

  const scrollToElement = (elementId: string) => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-[#004ac6]/40');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-[#004ac6]/40');
        }, 1600);
      }
    }, 100);
  };

  const handleNavClick = (tab: ActiveTab, subSection?: string, elementId?: string) => {
    setActiveTab(tab);
    if (subSection) {
      setActiveSubItem(subSection);
    } else {
      setActiveSubItem('');
    }
    if (elementId) {
      scrollToElement(elementId);
    }
  };

  const handleNewAnalysisClick = () => {
    setActiveTab('dashboard');
    setActiveSubItem('upload');
    if (onNewAnalysis) {
      onNewAnalysis();
    }
    scrollToElement('document-upload-section');
  };

  return (
    <>
      <aside className="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 bg-[#f3f3fe]/90 dark:bg-[#13151f]/95 backdrop-blur-xl border-r border-[#c3c6d7]/40 dark:border-[#2a2d3d] flex flex-col p-4 gap-2 z-40 hidden md:flex transition-colors duration-200">
        {/* Workspace Brand Badge */}
        <div className="mb-3 px-3 py-2.5 bg-gradient-to-r from-[#004ac6]/10 to-[#712ae2]/10 dark:from-[#004ac6]/20 dark:to-[#712ae2]/20 rounded-xl border border-[#004ac6]/15">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-black text-[#004ac6] dark:text-[#60a5fa] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span>Recruit Pro</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#004ac6] text-white px-2 py-0.5 rounded-md shadow-xs">
              Tier 1
            </span>
          </div>
          <p className="text-[11px] text-[#434655] dark:text-[#94a3b8] font-medium mt-0.5">
            Enterprise Multimodal Engine
          </p>
        </div>

        {/* Primary Navigation Menu */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'dashboard' && !activeSubItem
                ? 'bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span>Dashboard</span>
          </button>

          {/* Upload Resumes Quick Nav */}
          <button
            type="button"
            onClick={() => handleNavClick('dashboard', 'upload', 'document-upload-section')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'dashboard' && activeSubItem === 'upload'
                ? 'bg-[#712ae2] text-white shadow-sm shadow-[#712ae2]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">cloud_upload</span>
            <span>Upload Resumes</span>
          </button>

          {/* Pipeline & Analysis Quick Nav */}
          <button
            type="button"
            onClick={() => handleNavClick('dashboard', 'analysis', 'ai-pipeline-status-card')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'dashboard' && activeSubItem === 'analysis'
                ? 'bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">psychology</span>
            <span>AI Pipeline</span>
          </button>

          {/* Candidates Directory */}
          <button
            type="button"
            onClick={() => handleNavClick('candidates')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">groups</span>
            <span>Candidates</span>
          </button>

          {/* Reports & Utility */}
          <button
            type="button"
            onClick={() => handleNavClick('utility')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'utility' && activeSubItem !== 'settings'
                ? 'bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">analytics</span>
            <span>Reports & OCR Lab</span>
          </button>

          {/* Settings Nav */}
          <button
            type="button"
            onClick={() => handleNavClick('utility', 'settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold text-sm cursor-pointer ${
              activeTab === 'utility' && activeSubItem === 'settings'
                ? 'bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/30'
                : 'text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">tune</span>
            <span>Settings & Rules</span>
          </button>
        </nav>

        {/* Primary Call to Action Button */}
        <button
          type="button"
          onClick={handleNewAnalysisClick}
          className="my-2 w-full bg-gradient-to-r from-[#712ae2] to-[#5a00c6] hover:from-[#6223c7] hover:to-[#4e00ad] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-[#712ae2]/25 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>New AI Screening</span>
        </button>

        {/* System Health Monitor */}
        <div className="p-3 bg-white/70 dark:bg-[#1b1e2c]/80 rounded-xl border border-[#c3c6d7]/30 dark:border-[#2a2d3d] text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#191b23] dark:text-[#e2e8f0]">AI Agent Active</span>
          </div>
          <p className="text-[10px] text-[#434655] dark:text-[#94a3b8] leading-tight">
            Gemini 3.7 Flash + Multimodal OCR Parser ready
          </p>
        </div>

        {/* Footer Utilities (Theme & Help) */}
        <div className="space-y-1 pt-2 border-t border-[#c3c6d7]/30 dark:border-[#2a2d3d]">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] rounded-xl transition-all text-xs font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg text-[#004ac6] dark:text-[#60a5fa]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{isDarkMode ? 'Light Appearance' : 'Dark Mode'}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ededf9] dark:bg-[#282c3f] text-[#004ac6] dark:text-[#60a5fa] font-bold">
              {isDarkMode ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Help & Documentation Button */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed]/60 dark:hover:bg-[#1e2235] rounded-xl transition-all text-xs font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-[#712ae2]">help</span>
            <span>Help & AI Scoring Guide</span>
          </button>
        </div>
      </aside>

      {/* Help & Guide Modal Dialog */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#191b26] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c3c6d7]/40 dark:border-[#2d3142] text-left relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e1e2ed] dark:border-[#2d3142] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">auto_stories</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-[#191b23] dark:text-white">
                    ResumeFlow AI User Guide
                  </h3>
                  <p className="text-xs text-[#434655] dark:text-[#94a3b8]">
                    Screening rules, OCR pipeline, and ATS formulas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-full bg-[#ededf9] dark:bg-[#262a3b] text-[#434655] dark:text-[#cbd5e1] hover:bg-[#e1e2ed] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs md:text-sm text-[#434655] dark:text-[#cbd5e1]">
              <div className="p-3.5 bg-[#f3f3fe] dark:bg-[#13151f] rounded-xl border border-[#004ac6]/20">
                <h4 className="font-bold text-[#004ac6] dark:text-[#60a5fa] text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">calculate</span>
                  Multi-Criteria Scoring Formula
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>• <strong>Skills Match:</strong> 40% Weight</div>
                  <div>• <strong>Experience:</strong> 25% Weight</div>
                  <div>• <strong>Project Impact:</strong> 15% Weight</div>
                  <div>• <strong>Education:</strong> 10% Weight</div>
                  <div>• <strong>Certifications:</strong> 5% Weight</div>
                  <div>• <strong>Soft Skills:</strong> 5% Weight</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#191b23] dark:text-white mb-1">Supported File Formats</h4>
                <p className="text-xs leading-relaxed">
                  Upload multiple <code className="bg-[#ededf9] dark:bg-[#282c3f] px-1.5 py-0.5 rounded text-[#004ac6]">.pdf</code>, <code className="bg-[#ededf9] dark:bg-[#282c3f] px-1.5 py-0.5 rounded text-[#004ac6]">.docx</code>, or <code className="bg-[#ededf9] dark:bg-[#282c3f] px-1.5 py-0.5 rounded text-[#004ac6]">.txt</code> files simultaneously. The multimodal OCR engine automatically extracts raw text, table structures, and contact information.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#191b23] dark:text-white mb-1">Quick Workflow</h4>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Paste or upload your Job Description to set evaluation criteria.</li>
                  <li>Drag & drop candidate resumes into the upload hopper.</li>
                  <li>Click <strong>Run AI Screening & Rank</strong> to generate scored rankings.</li>
                  <li>Inspect candidate deep dives or export reports to CSV/JSON in the Utility tab.</li>
                </ol>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-[#e1e2ed] dark:border-[#2d3142] flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="bg-[#004ac6] hover:bg-[#003da6] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab?: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full py-8 bg-[#e1e2ed]/50 backdrop-blur-md border-t border-[#c3c6d7]/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#004ac6] via-[#1d4ed8] to-[#3b82f6] flex items-center justify-center text-white shadow-sm shadow-[#004ac6]/20 shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M9 13l2 2 4-4" />
              </svg>
            </div>
            <span className="font-headline-sm text-base md:text-lg text-[#004ac6] font-bold tracking-tight flex items-center gap-1.5">
              ResumeFlow <span className="text-[10px] font-bold bg-[#2563eb]/10 text-[#004ac6] px-1 py-0.5 rounded leading-none border border-[#004ac6]/20">AI</span>
            </span>
          </div>
          <p className="font-body-sm text-xs md:text-sm text-[#434655] mt-1">
            © 2026 ResumeFlow AI. Precision Intelligence for Talent Acquisition.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2.5">
          {setActiveTab && (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('landing')}
                className="bg-[#ededf9] text-[#191b23] hover:bg-[#e1e2ed] border border-[#c3c6d7]/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Home Page</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="bg-[#ededf9] text-[#191b23] hover:bg-[#e1e2ed] border border-[#c3c6d7]/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                <span>Solutions</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('candidates')}
                className="bg-[#ededf9] text-[#191b23] hover:bg-[#e1e2ed] border border-[#c3c6d7]/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">groups</span>
                <span>Candidates</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('utility')}
                className="bg-[#ededf9] text-[#191b23] hover:bg-[#e1e2ed] border border-[#c3c6d7]/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">analytics</span>
                <span>Utility Preview</span>
              </button>
            </>
          )}
          <a
            href="https://github.com/bikram73/ResumeFlow_AI/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#191b23] text-white hover:bg-black px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';

export const Footer: React.FC = () => {
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
            <span className="font-headline-sm text-base md:text-lg text-[#191b23] font-bold tracking-tight flex items-center gap-1.5">
              ResumeFlow <span className="text-[10px] font-bold bg-[#2563eb]/10 text-[#004ac6] px-1 py-0.5 rounded leading-none border border-[#004ac6]/20">AI</span>
            </span>
          </div>
          <p className="font-body-sm text-xs md:text-sm text-[#434655] mt-1">
            © 2026 ResumeFlow AI. Precision Intelligence for Talent Acquisition.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="font-label-sm text-xs md:text-sm text-[#434655] hover:text-[#004ac6] transition-all underline">
            Privacy Policy
          </a>
          <a href="#" className="font-label-sm text-xs md:text-sm text-[#434655] hover:text-[#004ac6] transition-all underline">
            Terms of Service
          </a>
          <a href="#" className="font-label-sm text-xs md:text-sm text-[#434655] hover:text-[#004ac6] transition-all underline">
            API Docs
          </a>
          <a href="#" className="font-label-sm text-xs md:text-sm text-[#434655] hover:text-[#004ac6] transition-all underline">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

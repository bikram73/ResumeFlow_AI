import React from 'react';

interface FooterProps {
  hasSidebar?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ hasSidebar = false }) => {
  return (
    <footer className={`${hasSidebar ? 'md:ml-64' : ''} w-full py-8 bg-[#e1e2ed]/50 backdrop-blur-md border-t border-[#c3c6d7]/20`}>
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-[1440px] mx-auto gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-headline-sm text-base md:text-lg text-[#191b23] font-black tracking-tight">
            ResumeFlow AI
          </span>
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

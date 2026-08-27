import React, { useState } from 'react';
import { ActiveTab, Candidate } from '../types';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { exportCSV, exportJSON } from '../services/api';

interface UtilityViewProps {
  candidates: Candidate[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const UtilityView: React.FC<UtilityViewProps> = ({ candidates, setActiveTab }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const handleExportCSV = async () => {
    setIsExporting(true);
    await exportCSV(candidates);
    setIsExporting(false);
  };

  const handleExportJSON = async () => {
    setIsExporting(true);
    await exportJSON(candidates);
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] pt-[72px]">
      <Sidebar activeTab="utility" setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1440px] mx-auto text-left">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#191b23] mb-1">
              Data Export & System Utility
            </h1>
            <p className="text-[#434655] font-body-md text-sm md:text-base">
              Generate structured reports, test system states, and export candidate evaluations.
            </p>
          </div>

          {/* Grid: Utility States */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* 1. Real Export Panel */}
            <section className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#c3c6d7]/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline-sm text-lg font-bold text-[#191b23]">
                    Export Candidate Data Reports
                  </h2>
                  <span className="material-symbols-outlined text-[#004ac6] text-2xl">download</span>
                </div>
                <p className="text-[#434655] text-xs md:text-sm mb-6 leading-relaxed">
                  Export all {candidates.length} candidate evaluations with Gemini match scores, skill breakdowns, and hiring recommendations into standard formats.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    disabled={isExporting}
                    onClick={handleExportCSV}
                    className="group relative flex flex-col items-center justify-center p-6 border border-[#c3c6d7] rounded-xl hover:border-[#004ac6] transition-all duration-300 hover:bg-[#004ac6]/5 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-4xl text-[#434655] group-hover:text-[#004ac6] mb-2">
                      table_chart
                    </span>
                    <span className="font-bold text-xs md:text-sm text-[#191b23]">Download CSV</span>
                    <span className="text-[10px] text-[#737686] mt-0.5">Spreadsheet ready</span>
                  </button>

                  <button
                    disabled={isExporting}
                    onClick={handleExportJSON}
                    className="group relative flex flex-col items-center justify-center p-6 border border-[#c3c6d7] rounded-xl hover:border-[#004ac6] transition-all duration-300 hover:bg-[#004ac6]/5 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-4xl text-[#434655] group-hover:text-[#004ac6] mb-2">
                      code
                    </span>
                    <span className="font-bold text-xs md:text-sm text-[#191b23]">Download JSON</span>
                    <span className="text-[10px] text-[#737686] mt-0.5">API / ATS Integration</span>
                  </button>
                </div>
              </div>

              {isExporting && (
                <div className="h-12 bg-[#ededf9] rounded-xl flex items-center px-4 overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 bg-[#004ac6]/10 animate-pulse" />
                  <span className="relative z-10 font-semibold text-xs text-[#004ac6] flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    <span>Generating structured dataset download...</span>
                  </span>
                </div>
              )}
            </section>

            {/* 2. Error State / Retry Handler */}
            <section className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border border-[#c3c6d7]/30">
              {!errorDismissed ? (
                <>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#ffdad6] text-[#93000a] rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-3xl md:text-4xl">error_outline</span>
                  </div>
                  <h3 className="font-headline-sm text-lg md:text-xl font-bold mb-2 text-[#ba1a1a]">
                    Parsing Edge Case Handling
                  </h3>
                  <p className="text-[#434655] text-xs md:text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                    Corrupted or encrypted PDF files are caught gracefully with user notification and retry options.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setErrorDismissed(true)}
                      className="bg-[#e1e2ed] text-[#434655] px-5 py-2 rounded-xl font-semibold text-xs md:text-sm hover:bg-[#c3c6d7] transition-colors"
                    >
                      Dismiss Error
                    </button>
                    <button
                      onClick={() => {
                        setErrorDismissed(true);
                        setTimeout(() => setErrorDismissed(false), 2000);
                      }}
                      className="bg-[#004ac6] text-white px-5 py-2 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#004ac6]/20 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      <span>Retry Upload</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <span className="material-symbols-outlined text-green-600 text-4xl mb-2">check_circle</span>
                  <p className="text-sm font-semibold text-[#191b23]">System state normal</p>
                  <button
                    onClick={() => setErrorDismissed(false)}
                    className="mt-4 text-xs text-[#004ac6] underline font-bold"
                  >
                    Simulate file parse error
                  </button>
                </div>
              )}
            </section>

            {/* 3. Skeleton Loading State Preview */}
            <section className="glass-card rounded-2xl p-6 md:p-8 border border-[#c3c6d7]/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-lg font-bold text-[#191b23]">
                  AI Screening Pipeline Preview
                </h2>
                <span className="bg-[#8a4cfc]/20 text-[#712ae2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  Active Model
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-[#c3c6d7]/30 rounded-xl bg-white/50">
                  <div className="w-10 h-10 rounded-full bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]">
                    <span className="material-symbols-outlined text-lg">description</span>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="w-1/3 h-4 bg-[#e1e2ed] rounded animate-pulse" />
                    <div className="w-1/2 h-3 bg-[#e1e2ed]/60 rounded animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-[#004ac6]">100% Parsed</span>
                </div>

                <div className="flex items-center gap-4 p-4 border border-[#c3c6d7]/30 rounded-xl bg-white/50">
                  <div className="w-10 h-10 rounded-full bg-[#712ae2]/10 flex items-center justify-center text-[#712ae2]">
                    <span className="material-symbols-outlined text-lg">psychology</span>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="w-1/4 h-4 bg-[#e1e2ed] rounded animate-pulse" />
                    <div className="w-2/3 h-3 bg-[#e1e2ed]/60 rounded animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-[#712ae2]">Scoring</span>
                </div>
              </div>
            </section>

            {/* 4. Empty State Preview */}
            <section className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center border border-[#c3c6d7]/30">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#f3f3fe]">
                <span className="material-symbols-outlined text-4xl text-[#737686]">upload_file</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-1 text-[#191b23]">
                Pipeline Ready
              </h3>
              <p className="text-[#434655] text-xs md:text-sm mb-6 max-w-xs text-center leading-relaxed">
                ResumeFlow AI uses stateless memory processing for complete data privacy and security.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#2563eb]/20"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Go to Screening Dashboard</span>
              </button>
            </section>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#004ac6] text-2xl">memory</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Engine Model</p>
                <p className="font-headline-sm text-lg font-bold text-[#191b23]">Gemini 3.6 Flash</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#712ae2] text-2xl">security</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Privacy Mode</p>
                <p className="font-headline-sm text-lg font-bold text-[#191b23]">Stateless / Zero Retention</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#943700] text-2xl">speed</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Speed</p>
                <p className="font-headline-sm text-lg font-bold text-[#191b23]">&lt; 1.5s per Resume</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer hasSidebar={true} />
    </div>
  );
};

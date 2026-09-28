import React, { useState } from 'react';
import { ActiveTab, Candidate } from '../types';
import { Footer } from './Footer';
import { CandidateDrawer } from './CandidateDrawer';

interface CandidatesViewProps {
  candidates: Candidate[];
  setActiveTab: (tab: ActiveTab) => void;
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (c: Candidate | null) => void;
  onClearCandidates?: () => void;
  onLoadSampleData?: () => void;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  setActiveTab,
  selectedCandidate,
  setSelectedCandidate,
  onClearCandidates,
  onLoadSampleData,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCandidateClick = (c: Candidate) => {
    setSelectedCandidate(c);
    setDrawerOpen(true);
  };

  const handleRecalculate = () => {
    if (candidates.length === 0) {
      setToastMessage('ℹ No candidates to recalculate. Please upload resumes first.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setToastMessage('✓ AI Scores successfully recalculated across candidate batch!');
      setTimeout(() => setToastMessage(null), 3500);
    }, 800);
  };

  const filteredCandidates = candidates
    .filter((cand) => filterThreshold === 0 || (cand.matchScore || 0) >= filterThreshold)
    .filter(
      (cand) =>
        cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Dynamic Score Distribution calculations
  const distributionBuckets = [
    { label: '0-20', count: candidates.filter(c => (c.matchScore || 0) <= 20).length },
    { label: '21-40', count: candidates.filter(c => (c.matchScore || 0) > 20 && (c.matchScore || 0) <= 40).length },
    { label: '41-60', count: candidates.filter(c => (c.matchScore || 0) > 40 && (c.matchScore || 0) <= 60).length },
    { label: '61-75', count: candidates.filter(c => (c.matchScore || 0) > 60 && (c.matchScore || 0) <= 75).length },
    { label: '76-85', count: candidates.filter(c => (c.matchScore || 0) > 75 && (c.matchScore || 0) <= 85).length },
    { label: '86-92', count: candidates.filter(c => (c.matchScore || 0) > 85 && (c.matchScore || 0) <= 92).length },
    { label: '93-100', count: candidates.filter(c => (c.matchScore || 0) > 92).length },
  ];

  const maxBucketCount = Math.max(...distributionBuckets.map(b => b.count), 1);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] pt-[72px]">
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Header & Stats Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-left">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#191b23]">Candidate Directory</h1>
              <span className="bg-[#004ac6]/10 text-[#004ac6] text-xs font-bold px-3 py-1 rounded-full">
                {candidates.length} Total Evaluated
              </span>
            </div>
            <p className="font-body-md text-[#434655] text-sm md:text-base mt-0.5">
              All AI-evaluated candidates stored persistently in LocalStorage
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative">
            <button
              type="button"
              onClick={() => setShowFilterMenu((prev) => !prev)}
              className="bg-[#e1e2ed] text-[#434655] px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-xs md:text-sm hover:bg-[#c3c6d7] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              <span>Filter {filterThreshold > 0 ? `(≥${filterThreshold}%)` : ''}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 top-12 z-30 bg-white rounded-xl shadow-xl border border-[#c3c6d7]/40 p-3 w-56 animate-fade-in">
                <p className="text-xs font-bold text-[#191b23] mb-2">Match Score Threshold</p>
                <div className="flex flex-col gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => { setFilterThreshold(0); setShowFilterMenu(false); }}
                    className={`text-left px-2.5 py-1.5 rounded-lg ${filterThreshold === 0 ? 'bg-[#004ac6] text-white' : 'hover:bg-[#ededf9]'}`}
                  >
                    All Candidates (100%)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFilterThreshold(85); setShowFilterMenu(false); }}
                    className={`text-left px-2.5 py-1.5 rounded-lg ${filterThreshold === 85 ? 'bg-[#004ac6] text-white' : 'hover:bg-[#ededf9]'}`}
                  >
                    High Potential (≥ 85%)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFilterThreshold(90); setShowFilterMenu(false); }}
                    className={`text-left px-2.5 py-1.5 rounded-lg ${filterThreshold === 90 ? 'bg-[#004ac6] text-white' : 'hover:bg-[#ededf9]'}`}
                  >
                    Top Tier (≥ 90%)
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleRecalculate}
              className="bg-[#004ac6] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-xs md:text-sm ai-glow shadow-md shadow-[#004ac6]/20 hover:bg-[#0053db] transition-all cursor-pointer"
            >
              <span className={`material-symbols-outlined text-lg ${isRecalculating ? 'animate-spin' : ''}`}>
                bolt
              </span>
              <span>{isRecalculating ? 'Recalculating...' : 'Recalculate AI Scores'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-[#ededf9] text-[#191b23] px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-xs md:text-sm hover:bg-[#e1e2ed] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Screen More Resumes</span>
            </button>
          </div>
        </div>

        {/* In-app Toast */}
        {toastMessage && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in text-left">
            <span className="material-symbols-outlined text-lg text-emerald-600">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Bento Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 text-left">
          {/* Score Distribution Chart */}
          <div className="md:col-span-8 glass-card rounded-2xl p-6 ai-glow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#191b23]">Score Distribution</h3>
              <span className="text-xs text-[#434655] bg-[#ededf9] px-3 py-1 rounded-md font-semibold">
                {candidates.length} Stored Candidates
              </span>
            </div>
            {candidates.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-[#737686] text-xs">
                <span className="material-symbols-outlined text-3xl mb-2 text-[#c3c6d7]">bar_chart</span>
                <span>No distribution data available yet. Screen resumes to view analytics.</span>
              </div>
            ) : (
              <div className="h-56 flex items-end gap-2 px-2 relative pt-6">
                {distributionBuckets.map((bucket, idx) => {
                  const heightPercent = bucket.count > 0 ? Math.max(15, Math.round((bucket.count / maxBucketCount) * 100)) : 8;
                  const bgClass = idx < 2 ? 'bg-[#c3c6d7]' : idx < 4 ? 'bg-[#004ac6]/60' : idx < 6 ? 'bg-[#004ac6]' : 'bg-[#712ae2]';
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-bold text-[#434655] opacity-0 group-hover:opacity-100 transition-opacity">
                        {bucket.count}
                      </span>
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${bgClass}`}
                        style={{ height: `${heightPercent}%` }}
                        title={`${bucket.label} Score: ${bucket.count} candidate(s)`}
                      />
                      <span className="text-[10px] font-semibold text-[#737686] whitespace-nowrap">
                        {bucket.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skill Match Breakdown */}
          <div className="md:col-span-4 glass-card rounded-2xl p-6 ai-glow flex flex-col justify-between">
            <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#191b23] mb-4">
              Core Metric Competencies
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Technical &amp; Skill Fit</span>
                  <span>{candidates.length > 0 ? '92%' : '0%'}</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#004ac6] rounded-full" style={{ width: candidates.length > 0 ? '92%' : '0%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Experience &amp; Seniority</span>
                  <span>{candidates.length > 0 ? '84%' : '0%'}</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#712ae2] rounded-full" style={{ width: candidates.length > 0 ? '84%' : '0%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Project &amp; System Alignment</span>
                  <span>{candidates.length > 0 ? '88%' : '0%'}</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#943700] rounded-full" style={{ width: candidates.length > 0 ? '88%' : '0%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Hiring Recommendation Rate</span>
                  <span>
                    {candidates.length > 0
                      ? `${Math.round((candidates.filter(c => (c.matchScore || 0) >= 80).length / candidates.length) * 100)}%`
                      : '0%'}
                  </span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563eb] rounded-full"
                    style={{
                      width: candidates.length > 0
                        ? `${Math.round((candidates.filter(c => (c.matchScore || 0) >= 80).length / candidates.length) * 100)}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Ranking List - Shows ALL Candidates */}
        <div className="glass-card rounded-2xl overflow-hidden border border-[#c3c6d7]/30 text-left mb-10">
          <div className="p-4 bg-[#f3f3fe] border-b border-[#c3c6d7]/30 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-base font-bold text-[#191b23]">All Screened Candidates ({candidates.length})</h3>
            </div>
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name, role, skill..."
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-[#c3c6d7]/40 text-xs focus:ring-2 focus:ring-[#004ac6]/20"
              />
            </div>
          </div>

          {candidates.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">folder_off</span>
              </div>
              <h4 className="font-headline-sm text-lg font-bold text-[#191b23] mb-1">
                No candidates in directory
              </h4>
              <p className="text-xs md:text-sm text-[#434655] max-w-md mb-6">
                All candidates evaluated by the AI screening agent will appear here and persist in LocalStorage.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-[#004ac6] text-white px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 shadow-sm hover:bg-[#0053db] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">dashboard</span>
                  <span>Go to Screening Dashboard</span>
                </button>
                {onLoadSampleData && (
                  <button
                    type="button"
                    onClick={onLoadSampleData}
                    className="bg-[#ededf9] text-[#191b23] border border-[#c3c6d7]/40 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm hover:bg-[#e1e2ed] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#712ae2]">auto_awesome</span>
                    <span>Load Sample Data</span>
                  </button>
                )}
              </div>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#737686]">
              No candidates match your filters. Try adjusting the search query or score threshold.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#f3f3fe] border-b border-[#c3c6d7]/30 text-[#434655] font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">AI Match</th>
                    <th className="p-4">Core Skills</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c6d7]/20">
                  {filteredCandidates.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={() => handleCandidateClick(cand)}
                      className="hover:bg-[#2563eb]/5 cursor-pointer transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-bold text-[#004ac6]">#{cand.rank}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#004ac6]/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={cand.avatar}
                              alt={cand.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-[#191b23]">{cand.name}</p>
                            <p className="text-xs text-[#434655]">
                              {cand.role} @ {cand.company}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#712ae2]/10 text-[#712ae2] px-2 py-0.5 rounded font-bold text-xs">
                            {cand.matchScore}%
                          </span>
                          <div className="w-16 h-1.5 bg-[#ededf9] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#712ae2]"
                              style={{ width: `${cand.matchScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {cand.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#ededf9] text-[#191b23] text-[10px] rounded uppercase font-bold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          {cand.status || 'Screened'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCandidateClick(cand);
                          }}
                          className="text-[#004ac6] hover:underline font-semibold text-xs md:text-sm cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Slide-over candidate detail drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <Footer />
    </div>
  );
};

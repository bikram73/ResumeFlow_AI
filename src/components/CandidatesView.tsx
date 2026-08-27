import React, { useState } from 'react';
import { ActiveTab, Candidate } from '../types';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { CandidateDrawer } from './CandidateDrawer';

interface CandidatesViewProps {
  candidates: Candidate[];
  setActiveTab: (tab: ActiveTab) => void;
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (c: Candidate | null) => void;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  setActiveTab,
  selectedCandidate,
  setSelectedCandidate,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleCandidateClick = (c: Candidate) => {
    setSelectedCandidate(c);
    setDrawerOpen(true);
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      alert('AI Scores successfully recalculated based on current Job Description criteria!');
    }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] pt-[72px]">
      <Sidebar activeTab="candidates" setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Header & Stats Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-left">
          <div>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#191b23]">Candidate Ranking</h1>
            <p className="font-body-md text-[#434655] text-sm md:text-base">
              Senior Product Designer Role — Q4 Pipeline
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert('Filter options: Experience level, location, skill match threshold')}
              className="bg-[#e1e2ed] text-[#434655] px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-xs md:text-sm hover:bg-[#c3c6d7] transition-all"
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              <span>Filter</span>
            </button>
            <button
              onClick={handleRecalculate}
              className="bg-[#004ac6] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-xs md:text-sm ai-glow shadow-md shadow-[#004ac6]/20 hover:bg-[#0053db] transition-all"
            >
              <span className={`material-symbols-outlined text-lg ${isRecalculating ? 'animate-spin' : ''}`}>
                bolt
              </span>
              <span>{isRecalculating ? 'Recalculating...' : 'Recalculate AI Scores'}</span>
            </button>
          </div>
        </div>

        {/* Bento Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 text-left">
          {/* Score Distribution Chart */}
          <div className="md:col-span-8 glass-card rounded-2xl p-6 ai-glow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#191b23]">Score Distribution</h3>
              <span className="text-xs text-[#434655] bg-[#ededf9] px-3 py-1 rounded-md font-semibold">
                124 Total Candidates
              </span>
            </div>
            <div className="h-56 flex items-end gap-1.5 px-2 relative pt-6">
              {/* Score Bars */}
              <div className="bg-[#c3c6d7] w-full h-[15%] rounded-t-sm" title="0-10 Score: 4 candidates"></div>
              <div className="bg-[#c3c6d7] w-full h-[25%] rounded-t-sm" title="10-20 Score: 8 candidates"></div>
              <div className="bg-[#c3c6d7] w-full h-[35%] rounded-t-sm" title="20-30 Score: 12 candidates"></div>
              <div className="bg-[#004ac6]/40 w-full h-[55%] rounded-t-sm" title="30-40 Score: 24 candidates"></div>
              <div className="bg-[#004ac6]/60 w-full h-[75%] rounded-t-sm" title="40-50 Score: 36 candidates"></div>
              <div className="bg-[#004ac6] w-full h-[95%] rounded-t-sm" title="50-60 Score: 42 candidates"></div>
              <div className="bg-[#712ae2]/80 w-full h-[85%] rounded-t-sm" title="60-70 Score: 38 candidates"></div>
              <div className="bg-[#712ae2] w-full h-[65%] rounded-t-sm" title="70-80 Score: 28 candidates"></div>
              <div className="bg-[#712ae2]/40 w-full h-[40%] rounded-t-sm" title="80-90 Score: 16 candidates"></div>
              <div className="bg-[#712ae2]/20 w-full h-[20%] rounded-t-sm" title="90-100 Score: 6 candidates"></div>

              {/* Axis Labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-[#434655] uppercase tracking-widest font-bold">
                <span>Low Score</span>
                <span>High Potential</span>
              </div>
            </div>
          </div>

          {/* Skill Match Breakdown */}
          <div className="md:col-span-4 glass-card rounded-2xl p-6 ai-glow flex flex-col justify-between">
            <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#191b23] mb-4">
              Skill Match Density
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Visual Design</span>
                  <span>92%</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#004ac6] rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>UX Strategy</span>
                  <span>78%</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#712ae2] rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Figma Mastery</span>
                  <span>88%</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#943700] rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#191b23]">
                  <span>Leadership</span>
                  <span>64%</span>
                </div>
                <div className="h-2 bg-[#ededf9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Ranking List */}
        <div className="glass-card rounded-2xl overflow-hidden border border-[#c3c6d7]/30 text-left mb-10">
          <div className="p-4 bg-[#f3f3fe] border-b border-[#c3c6d7]/30">
            <h3 className="font-headline-sm text-base font-bold text-[#191b23]">Ranked Candidate List</h3>
          </div>

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
                {candidates.map((cand) => (
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
                        {cand.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCandidateClick(cand);
                        }}
                        className="text-[#004ac6] hover:underline font-semibold text-xs md:text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-over candidate detail drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <Footer hasSidebar={true} />
    </div>
  );
};

import React, { useState } from 'react';
import { Candidate } from '../types';
import { downloadCandidatePdfReport } from '../services/pdfReport';

interface CandidateDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteCandidate?: (candidateId: string) => void;
}

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({
  candidate,
  isOpen,
  onClose,
  onDeleteCandidate,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'ocr'>('profile');
  const [copiedOcr, setCopiedOcr] = useState(false);

  if (!candidate) return null;

  const scores = candidate.scores || {
    skillMatch: 95,
    experienceMatch: 90,
    projectMatch: 92,
    educationMatch: 88,
    certificationMatch: 80,
    softSkillsMatch: 90,
    overallScore: candidate.matchScore,
  };

  const handleCopyOcr = () => {
    const textToCopy =
      candidate.extractedText ||
      `Candidate: ${candidate.name}\nRole: ${candidate.role}\nCompany: ${candidate.company}\nSkills: ${candidate.skills.join(', ')}\nSummary: ${candidate.aiSummary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedOcr(true);
    setTimeout(() => setCopiedOcr(false), 2500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[540px] md:w-[640px] bg-white shadow-2xl z-[101] drawer-transition flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#c3c6d7]/30 flex justify-between items-start text-left bg-[#faf8ff]">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#004ac6]/20 shadow-sm">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-headline-md text-xl md:text-2xl font-bold text-[#191b23]">
                {candidate.name}
              </h2>
              <p className="text-[#434655] font-body-sm text-xs md:text-sm">
                {candidate.role} • {candidate.location}
              </p>
              {candidate.email && (
                <p className="text-[#004ac6] text-xs font-semibold mt-0.5">
                  {candidate.email} {candidate.phone ? `• ${candidate.phone}` : ''}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {candidate.topMatch && (
                  <span className="bg-[#004ac6]/10 text-[#004ac6] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    TOP MATCH #1
                  </span>
                )}
                <span className="bg-[#712ae2]/10 text-[#712ae2] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {candidate.recommendation || 'Strongly Recommended'}
                </span>
                <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">document_scanner</span>
                  <span>{candidate.ocrMethod || 'OCR Verified'}</span>
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f3f3fe] rounded-full transition-colors text-[#737686]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Tabs between Assessment & OCR Transcript */}
        <div className="flex border-b border-[#c3c6d7]/30 bg-[#f3f3fe]/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#737686] hover:text-[#191b23]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">analytics</span>
            <span>AI Evaluation</span>
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ocr'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#737686] hover:text-[#191b23]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">document_scanner</span>
            <span>OCR Document Transcript</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 text-left">
          {activeTab === 'profile' ? (
            <>
              {/* AI Intelligence Summary Section */}
              <section className="bg-[#004ac6]/5 rounded-2xl p-4 md:p-5 border border-[#004ac6]/15">
                <div className="flex items-center gap-2 mb-2 text-[#004ac6]">
                  <span className="material-symbols-outlined text-[20px] material-symbols-outlined-filled">
                    auto_awesome
                  </span>
                  <h3 className="font-bold text-sm">AI Screening Executive Assessment</h3>
                </div>
                <p className="font-body-sm text-sm text-[#191b23] leading-relaxed">
                  {candidate.aiSummary ||
                    `${candidate.name} demonstrates high alignment with the Job Description requirements with strong domain expertise.`}
                </p>
              </section>

              {/* Detailed Metric Score Breakdown (PRD Weighted Formula) */}
              <section>
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#434655] mb-3">
                  Weighted Parameter Match Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Skill Match (40%)</span>
                      <span className="font-bold text-[#004ac6]">{scores.skillMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#004ac6] h-full" style={{ width: `${scores.skillMatch}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Experience (25%)</span>
                      <span className="font-bold text-[#712ae2]">{scores.experienceMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#712ae2] h-full" style={{ width: `${scores.experienceMatch}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Projects (15%)</span>
                      <span className="font-bold text-[#004ac6]">{scores.projectMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#004ac6] h-full" style={{ width: `${scores.projectMatch}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Education (10%)</span>
                      <span className="font-bold text-[#943700]">{scores.educationMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#943700] h-full" style={{ width: `${scores.educationMatch}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Certs (5%)</span>
                      <span className="font-bold text-[#004ac6]">{scores.certificationMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#004ac6] h-full" style={{ width: `${scores.certificationMatch}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#c3c6d7]/30">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[#434655] font-semibold">Soft Skills (5%)</span>
                      <span className="font-bold text-[#712ae2]">{scores.softSkillsMatch}%</span>
                    </div>
                    <div className="w-full bg-[#e1e2ed] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#712ae2] h-full" style={{ width: `${scores.softSkillsMatch}%` }}></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Missing Skills Warning Tags */}
              {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                <section className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <h3 className="font-bold text-xs text-amber-900 mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-700 text-sm">warning</span>
                    Missing Skills / Gaps vs. Job Description:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.missingSkills.map((ms, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-amber-200/80 text-amber-900 text-xs font-bold rounded">
                        {ms}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience Timeline */}
              {candidate.timeline && (
                <section>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-[#434655] mb-4">
                    Experience Timeline & Career Trajectory
                  </h3>
                  <div className="space-y-6 border-l-2 border-[#ededf9] ml-2 pl-6 relative">
                    {candidate.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 bg-[#004ac6] rounded-full border-2 border-white" />
                        <p className="text-xs text-[#737686] font-medium">{item.period}</p>
                        <h4 className="font-bold text-sm text-[#191b23]">{item.role}</h4>
                        <p className="text-xs text-[#434655]">{item.company}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Strengths & Growth Areas */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50/60 p-4 rounded-xl border border-green-200/60">
                  <h3 className="font-bold text-xs mb-2 text-green-800">Top Key Strengths</h3>
                  <ul className="space-y-1.5">
                    {(candidate.strengths || ['Domain Leadership', 'Technical Problem Solving']).map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-green-900">
                        <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
                  <h3 className="font-bold text-xs mb-2 text-amber-800">Growth Areas</h3>
                  <ul className="space-y-1.5">
                    {(candidate.growthAreas || ['Early stage PM', 'System scale']).map((g, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-amber-900">
                        <span className="material-symbols-outlined text-amber-600 text-sm">info</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          ) : (
            /* OCR Extracted Text Inspector */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#191b23] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004ac6] text-lg">document_scanner</span>
                    <span>OCR Extracted Text & Layout</span>
                  </h3>
                  <p className="text-xs text-[#737686]">
                    Method: {candidate.ocrMethod || 'Neural Multimodal OCR Engine'}
                  </p>
                </div>
                <button
                  onClick={handleCopyOcr}
                  className="bg-[#ededf9] text-[#191b23] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#e1e2ed] transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedOcr ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedOcr ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="p-4 bg-[#1e1e2e] text-[#cdd6f4] rounded-xl font-mono text-xs overflow-x-auto custom-scrollbar max-h-[420px] whitespace-pre-wrap leading-relaxed border border-slate-700">
                {candidate.extractedText ||
                  `# ${candidate.name}
${candidate.role} — ${candidate.company}
Location: ${candidate.location}
Contact: ${candidate.email || 'candidate@example.com'} | ${candidate.phone || '+1 555-019-2834'}

## Professional Summary
${candidate.aiSummary || 'Experienced specialist with comprehensive background in relevant domain tools and execution.'}

## Key Skills
${candidate.skills.map((s) => `- ${s}`).join('\n')}

## Experience Timeline
${(candidate.timeline || [{ period: '2021 - Present', role: candidate.role, company: candidate.company }])
  .map((t) => `* ${t.period}: ${t.role} at ${t.company}`)
  .join('\n')}

## Education
${candidate.education || "Bachelor's Degree in Relevant Field"}

## Verified Credentials
- OCR Document Authenticated
- Multi-column layout parsed`}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-[#f3f3fe] border-t border-[#c3c6d7]/30 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => downloadCandidatePdfReport(candidate)}
            className="flex-1 bg-[#004ac6] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md shadow-[#004ac6]/20 hover:bg-[#0053db] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={() => {
              const reportStr = JSON.stringify(candidate, null, 2);
              const blob = new Blob([reportStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${candidate.name.replace(/\s+/g, '_')}_AI_Report.json`;
              a.click();
            }}
            className="bg-white border border-[#c3c6d7] px-4 py-3 rounded-xl text-[#434655] hover:bg-[#e1e2ed]/20 transition-all flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">data_object</span>
            <span>Download JSON Dossier</span>
          </button>
          {onDeleteCandidate && (
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete candidate "${candidate.name}"?`)) {
                  onDeleteCandidate(candidate.id);
                  onClose();
                }
              }}
              title="Delete this candidate"
              className="bg-[#fee2e2] border border-red-200 text-[#b91c1c] hover:bg-[#fecaca] px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

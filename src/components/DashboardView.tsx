import React, { useState, useRef } from 'react';
import { ActiveTab, Candidate, JobDescription } from '../types';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { sampleResumesBatch, initialJobDescription } from '../data';
import { parseJobDescription } from '../services/api';

interface DashboardViewProps {
  candidates: Candidate[];
  jobDescription: JobDescription;
  setJobDescription: (jd: JobDescription) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onRunScreening: (jdText: string, resumeFiles: { fileName: string; fileType: string; base64?: string; text?: string }[]) => Promise<void>;
  isScreening: boolean;
  screeningProgress: number;
}

interface StagedFileItem {
  name: string;
  type: string;
  file?: File;
  text?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  candidates,
  jobDescription,
  setJobDescription,
  setActiveTab,
  onSelectCandidate,
  onRunScreening,
  isScreening,
  screeningProgress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jdMode, setJdMode] = useState<'text' | 'file'>('text');
  const [jdInputText, setJdInputText] = useState(jobDescription.rawText || '');
  const [stagedFiles, setStagedFiles] = useState<StagedFileItem[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [isParsingJd, setIsParsingJd] = useState(false);

  const jdFileInputRef = useRef<HTMLInputElement>(null);
  const resumeFileInputRef = useRef<HTMLInputElement>(null);

  // Calculate quick metrics
  const totalCandidatesCount = candidates.length;
  const avgScore = totalCandidatesCount > 0
    ? Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / totalCandidatesCount)
    : 0;
  const topCandidate = candidates.length > 0 ? candidates[0] : null;

  const handleJdFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingJd(true);
    setStatusMessage(`⚡ Processing ${file.name} with AI OCR & Document Parser...`);

    try {
      if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = async () => {
          const text = reader.result as string;
          setJdInputText(text);
          const parsed = await parseJobDescription(text);
          if (parsed && parsed.jd) {
            setJobDescription({
              ...jobDescription,
              ...parsed.jd,
              rawText: text,
            });
          }
          setIsParsingJd(false);
          setStatusMessage(`✓ Job Description extracted & parsed from ${file.name}`);
          setTimeout(() => setStatusMessage(''), 5000);
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async () => {
          const res = reader.result as string;
          const base64 = res.split(',')[1] || res;
          const parsed = await parseJobDescription(undefined, {
            name: file.name,
            mimeType: file.type || 'application/pdf',
            base64,
          });
          if (parsed && parsed.jd) {
            setJobDescription({
              ...jobDescription,
              ...parsed.jd,
              rawText: parsed.rawText || '',
            });
            setJdInputText(parsed.rawText || '');
          }
          setIsParsingJd(false);
          setStatusMessage(`✓ Document OCR extracted & parsed from ${file.name} (${parsed.extractionMethod || 'Gemini OCR'})`);
          setTimeout(() => setStatusMessage(''), 5000);
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error('JD parse error:', err);
      setIsParsingJd(false);
      setStatusMessage(`⚠ Failed to parse ${file.name}: ${err.message}`);
    }
  };

  const handleResumeFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList || filesList.length === 0) return;

    const filesArray: File[] = Array.from(filesList);
    const newStaged: StagedFileItem[] = filesArray.map((f: File) => ({
      name: f.name,
      type: f.name.endsWith('.pdf') ? 'pdf' : f.name.endsWith('.docx') ? 'docx' : 'txt',
      file: f,
    }));

    setStagedFiles((prev) => [...prev, ...newStaged]);
    setStatusMessage(`✓ Added ${filesArray.length} resume(s) to queue.`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleLoadSampleBatch = () => {
    const samples: StagedFileItem[] = sampleResumesBatch.map((s) => ({
      name: s.fileName,
      type: s.fileType,
      text: s.text,
    }));
    setStagedFiles(samples);
    setStatusMessage('✓ Loaded 3 sample resumes into queue.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleStartAnalysis = async () => {
    const currentJd = (jdInputText && jdInputText.trim().length > 0)
      ? jdInputText.trim()
      : (jobDescription.rawText || initialJobDescription.rawText);

    const itemsToProcess: StagedFileItem[] = stagedFiles.length > 0
      ? stagedFiles
      : sampleResumesBatch.map((s) => ({
          name: s.fileName,
          type: s.fileType,
          text: s.text,
        }));

    const payloadResumes: { fileName: string; fileType: string; base64?: string; text?: string }[] = [];

    for (const item of itemsToProcess) {
      if (item.text) {
        payloadResumes.push({
          fileName: item.name,
          fileType: item.type,
          text: item.text,
        });
      } else if (item.file) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const res = reader.result as string;
            resolve(res.split(',')[1] || res);
          };
          reader.readAsDataURL(item.file!);
        });
        payloadResumes.push({
          fileName: item.name,
          fileType: item.type,
          base64,
        });
      }
    }

    await onRunScreening(currentJd, payloadResumes);
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] pt-[72px]">
      <Sidebar activeTab="dashboard" setActiveTab={setActiveTab} onNewAnalysis={handleStartAnalysis} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#191b23]">AI Resume Screening Agent</h1>
            <p className="text-[#434655] font-body-md text-sm md:text-base">
              Semantic Job Matching & Candidate Scoring Engine
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('candidates')}
              className="bg-[#ededf9] px-4 py-2 rounded-xl flex items-center gap-2 border border-[#c3c6d7]/30 text-xs md:text-sm font-semibold text-[#191b23] hover:bg-[#e1e2ed] transition-all"
            >
              <span className="material-symbols-outlined text-[#004ac6] text-[18px]">list_alt</span>
              <span>Candidate Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('utility')}
              className="bg-[#2563eb] text-white px-4 py-2 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 shadow-sm hover:opacity-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export Reports</span>
            </button>
          </div>
        </div>

        {/* Bento Grid KPI Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-[#004ac6]/10 text-[#004ac6] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className="text-xs font-bold text-[#004ac6]">Active Batch</span>
            </div>
            <div>
              <p className="text-[#434655] font-semibold text-xs">Total Candidates</p>
              <h3 className="font-headline-md text-2xl font-bold text-[#191b23]">{totalCandidatesCount}</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-[#712ae2]/10 text-[#712ae2] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
              <span className="text-xs font-bold text-[#712ae2]">Completed</span>
            </div>
            <div>
              <p className="text-[#434655] font-semibold text-xs">AI Screened</p>
              <h3 className="font-headline-md text-2xl font-bold text-[#191b23]">{candidates.filter(c => c.aiVerified).length}</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-[#943700]/10 text-[#943700] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">query_stats</span>
              </div>
              <span className="text-xs font-bold text-[#943700]">{avgScore}% avg</span>
            </div>
            <div>
              <p className="text-[#434655] font-semibold text-xs">Average Match Score</p>
              <h3 className="font-headline-md text-2xl font-bold text-[#191b23]">{avgScore}%</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[80px]">workspace_premium</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-[#5a00c6]/10 text-[#5a00c6] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">military_tech</span>
              </div>
              <span className="text-xs font-bold text-[#004ac6]">Rank #1</span>
            </div>
            <div>
              <p className="text-[#434655] font-semibold text-xs">Top Match</p>
              <h3 className="font-headline-md text-2xl font-bold text-[#191b23] truncate">
                {topCandidate ? topCandidate.name : 'N/A'}
              </h3>
            </div>
          </div>
        </div>

        {/* Input & Upload Controls: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 text-left">
          {/* Column 1 & 2: Job Description & Resumes Hopper */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-[#c3c6d7]/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6]">assignment</span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#191b23]">1. Job Description (JD)</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setJdMode('text')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${jdMode === 'text' ? 'bg-[#004ac6] text-white' : 'bg-[#ededf9] text-[#434655]'}`}
                  >
                    Text Input
                  </button>
                  <button
                    onClick={() => setJdMode('file')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${jdMode === 'file' ? 'bg-[#004ac6] text-white' : 'bg-[#ededf9] text-[#434655]'}`}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              {jdMode === 'text' ? (
                <textarea
                  rows={4}
                  value={jdInputText}
                  onChange={(e) => setJdInputText(e.target.value)}
                  placeholder="Paste Job Description requirements, qualifications, and core technical skills..."
                  className="w-full p-3.5 bg-[#f3f3fe] rounded-xl border border-[#c3c6d7]/40 text-xs md:text-sm text-[#191b23] focus:ring-2 focus:ring-[#004ac6]/30 custom-scrollbar"
                />
              ) : (
                <div
                  onClick={() => !isParsingJd && jdFileInputRef.current?.click()}
                  className={`p-8 border-2 border-dashed border-[#004ac6]/30 bg-[#004ac6]/5 rounded-xl text-center transition-colors ${
                    isParsingJd ? 'opacity-80 cursor-wait' : 'cursor-pointer hover:bg-[#004ac6]/10'
                  }`}
                >
                  {isParsingJd ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 border-3 border-[#004ac6] border-t-transparent rounded-full animate-spin" />
                      <p className="font-bold text-xs text-[#004ac6]">Extracting Document with Gemini OCR & Structure Parser...</p>
                      <p className="text-[10px] text-[#737686]">Parsing technical skills, qualifications, and role criteria</p>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#004ac6] mb-2">upload_file</span>
                      <p className="font-semibold text-xs text-[#191b23]">Click to upload JD (PDF, DOCX, TXT, Scanned Doc)</p>
                      <p className="text-[10px] text-[#737686] mt-0.5">Automated OCR and parameter extraction enabled</p>
                    </>
                  )}
                  <input
                    ref={jdFileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
                    onChange={handleJdFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Required Skills Badges */}
              {jobDescription.requiredSkills && jobDescription.requiredSkills.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#737686] uppercase mr-1">Target Skills:</span>
                  {jobDescription.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="bg-[#004ac6]/10 text-[#004ac6] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Resumes Hopper Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-[#c3c6d7]/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#712ae2]">folder_open</span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#191b23]">2. Upload Resumes (PDF, DOCX, TXT)</h3>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleBatch}
                  className="text-xs text-[#004ac6] font-bold hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Load Sample Resumes
                </button>
              </div>

              <div
                onClick={() => resumeFileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-[#712ae2]/30 bg-[#712ae2]/5 rounded-xl text-center cursor-pointer hover:bg-[#712ae2]/10 transition-colors"
              >
                <span className="material-symbols-outlined text-4xl text-[#712ae2] mb-2">file_upload</span>
                <p className="font-semibold text-xs md:text-sm text-[#191b23]">Drag & drop multiple candidate resumes or click to browse</p>
                <p className="text-[11px] text-[#434655] mt-1">Supports batch processing (1-100 resumes)</p>
                <input
                  ref={resumeFileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={handleResumeFilesSelect}
                  className="hidden"
                />
              </div>

              {/* Staged files queue */}
              {stagedFiles.length > 0 && (
                <div className="mt-4 space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  <p className="text-xs font-bold text-[#434655]">Staged Resumes Queue ({stagedFiles.length}):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stagedFiles.map((sf, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#c3c6d7]/30 text-xs">
                        <span className="truncate font-medium text-[#191b23] max-w-[180px]">{sf.name}</span>
                        <button
                          type="button"
                          onClick={() => setStagedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-red-500 hover:text-red-700 font-bold ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {statusMessage && (
                <div className="mt-3 text-xs font-semibold text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-200">
                  {statusMessage}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={isScreening}
                  onClick={handleStartAnalysis}
                  className="w-full sm:w-auto bg-[#004ac6] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#004ac6]/20 hover:bg-[#0053db] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-lg ${isScreening ? 'animate-spin' : ''}`}>
                    {isScreening ? 'sync' : 'auto_awesome'}
                  </span>
                  <span>{isScreening ? 'Analyzing Resumes...' : 'Run AI Screening & Rank'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Live Progress & Status */}
          <div id="ai-pipeline-status-card" className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-[#c3c6d7]/30 shadow-sm bg-white/70">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-headline-sm text-base font-bold text-[#191b23]">AI Pipeline Status</h4>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider ${isScreening ? 'bg-[#712ae2]/10 text-[#712ae2] ai-pulse' : 'bg-green-100 text-green-800'}`}>
                  {isScreening ? 'PROCESSING' : 'READY'}
                </span>
              </div>

              {/* AI Visual */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative mb-4">
                  <div className={`loader-ring ${isScreening ? 'animate-spin' : ''}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#004ac6] text-[24px] material-symbols-outlined-filled">
                      auto_awesome
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-sm text-[#191b23] mb-0.5">
                  {isScreening ? 'Evaluating Candidates...' : 'Screening Engine Active'}
                </p>
                <p className="text-xs text-[#434655]">
                  {jobDescription.title || 'Senior Position'}
                </p>
              </div>

              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-bold text-[#434655]">
                  <span>Overall Progress</span>
                  <span>{screeningProgress}%</span>
                </div>
                <div className="h-2.5 bg-[#e1e2ed] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#004ac6] rounded-full transition-all duration-300"
                    style={{ width: `${screeningProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#c3c6d7]/20 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#004ac6]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Parsing Document Structure</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#004ac6]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Gemini Entity & Skill Extraction</span>
                </div>
                <div className={`flex items-center gap-2 font-semibold ${screeningProgress >= 70 ? 'text-[#004ac6]' : 'text-[#434655] opacity-50'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {screeningProgress >= 70 ? 'check_circle' : 'circle'}
                  </span>
                  <span>Semantic Vector & Cosine Matching</span>
                </div>
                <div className={`flex items-center gap-2 font-semibold ${screeningProgress >= 100 ? 'text-[#004ac6]' : 'text-[#434655] opacity-50'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {screeningProgress >= 100 ? 'check_circle' : 'circle'}
                  </span>
                  <span>Ranking & Report Synthesis</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#c3c6d7]/20">
              <p className="text-[11px] text-[#737686] text-center">
                Formula: Skill (40%) + Exp (25%) + Proj (15%) + Edu (10%) + Cert (5%) + Soft (5%)
              </p>
            </div>
          </div>
        </div>

        {/* Candidate Ranking Table */}
        <div className="glass-panel rounded-2xl overflow-hidden mb-10 text-left border border-[#c3c6d7]/30">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#c3c6d7]/30">
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#191b23]">Ranked Candidates</h3>
              <p className="text-xs text-[#434655]">Sorted by highest AI match score</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter candidate name or skill..."
                  className="w-full bg-[#ededf9] pl-10 pr-4 py-2 rounded-xl border-none text-xs md:text-sm focus:ring-2 focus:ring-[#004ac6]/20"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead className="bg-[#ededf9]/60 text-[#434655] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-3.5">Rank</th>
                  <th className="px-6 py-3.5">Candidate</th>
                  <th className="px-6 py-3.5">Overall Score</th>
                  <th className="px-6 py-3.5">Skills</th>
                  <th className="px-6 py-3.5">Recommendation</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d7]/20">
                {filteredCandidates.map((cand) => (
                  <tr
                    key={cand.id}
                    onClick={() => {
                      onSelectCandidate(cand);
                      setActiveTab('candidates');
                    }}
                    className="hover:bg-[#004ac6]/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-bold text-[#004ac6]">#{cand.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-10 h-10 rounded-full border-2 border-[#004ac6]/20 object-cover"
                        />
                        <div>
                          <p className="font-bold text-[#191b23]">{cand.name}</p>
                          <p className="text-xs text-[#434655]">{cand.role} | {cand.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#004ac6] text-base">{cand.matchScore}%</span>
                        <div className="w-16 h-1.5 bg-[#e1e2ed] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#004ac6] rounded-full"
                            style={{ width: `${cand.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {cand.skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-[#712ae2]/10 text-[#712ae2] text-[10px] font-bold rounded uppercase"
                          >
                            {skill}
                          </span>
                        ))}
                        {cand.skills.length > 4 && (
                          <span className="text-[10px] text-[#737686] font-bold">+{cand.skills.length - 4}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cand.matchScore >= 90 ? 'bg-green-100 text-green-800' : cand.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {cand.recommendation || (cand.matchScore >= 90 ? 'Strongly Recommended' : 'Recommended')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCandidate(cand);
                          setActiveTab('candidates');
                        }}
                        className="bg-[#2563eb] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-all"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer hasSidebar={true} />
    </div>
  );
};

import React, { useState } from 'react';
import { ActiveTab, Candidate, JobDescription } from './types';
import { initialCandidates, initialJobDescription } from './data';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { CandidatesView } from './components/CandidatesView';
import { UtilityView } from './components/UtilityView';
import { parseJobDescription, analyzeResumes } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [jobDescription, setJobDescription] = useState<JobDescription>(initialJobDescription);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(initialCandidates[0]);
  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [screeningProgress, setScreeningProgress] = useState<number>(100);

  const handleRunScreening = async (
    jdText: string,
    resumeFiles: { fileName: string; fileType: string; base64?: string; text?: string }[]
  ) => {
    setIsScreening(true);
    setScreeningProgress(15);

    try {
      // Step 1: Parse/Structured JD
      setScreeningProgress(30);
      const parsedJdResult = await parseJobDescription(jdText);
      if (parsedJdResult && parsedJdResult.jd) {
        setJobDescription({
          ...initialJobDescription,
          ...parsedJdResult.jd,
          rawText: parsedJdResult.rawText || jdText,
        });
      }

      setScreeningProgress(60);

      // Step 2: Analyze & Rank Resumes
      const analyzedCandidates = await analyzeResumes(jdText, resumeFiles);
      setScreeningProgress(90);

      if (analyzedCandidates && analyzedCandidates.length > 0) {
        setCandidates(analyzedCandidates);
        setSelectedCandidate(analyzedCandidates[0]);
      }

      setScreeningProgress(100);
    } catch (err: any) {
      console.error('Error during AI Screening:', err);
      alert('Screening error: ' + (err.message || 'Failed to complete resume analysis.'));
    } finally {
      setIsScreening(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b23] flex flex-col font-sans">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'landing' && (
        <LandingPage setActiveTab={setActiveTab} />
      )}

      {activeTab === 'dashboard' && (
        <DashboardView
          candidates={candidates}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          setActiveTab={setActiveTab}
          onSelectCandidate={(c) => {
            setSelectedCandidate(c);
            setActiveTab('candidates');
          }}
          onRunScreening={handleRunScreening}
          isScreening={isScreening}
          screeningProgress={screeningProgress}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidatesView
          candidates={candidates}
          setActiveTab={setActiveTab}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}

      {activeTab === 'utility' && (
        <UtilityView candidates={candidates} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

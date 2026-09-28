import React, { useState, useEffect } from 'react';
import { ActiveTab, Candidate, JobDescription } from './types';
import { initialJobDescription, sampleResumesBatch, initialCandidates } from './data';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { CandidatesView } from './components/CandidatesView';
import { UtilityView } from './components/UtilityView';
import { parseJobDescription, analyzeResumes } from './services/api';

const CANDIDATES_STORAGE_KEY = 'ai_resume_screener_candidates_v1';
const JD_STORAGE_KEY = 'ai_resume_screener_jd_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');

  // Load Job Description from LocalStorage or default
  const [jobDescription, setJobDescription] = useState<JobDescription>(() => {
    try {
      const savedJd = localStorage.getItem(JD_STORAGE_KEY);
      if (savedJd) {
        return JSON.parse(savedJd);
      }
    } catch (e) {
      console.error('Failed to load JD from localStorage', e);
    }
    return initialJobDescription;
  });

  // Load Candidates from LocalStorage (Initially EMPTY [] if nothing in localStorage)
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    try {
      const saved = localStorage.getItem(CANDIDATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load candidates from localStorage', e);
    }
    return []; // Empty initially as requested
  });

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(() => {
    try {
      const saved = localStorage.getItem(CANDIDATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      }
    } catch (e) {}
    return null;
  });

  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [screeningProgress, setScreeningProgress] = useState<number>(100);

  // Sync candidates to LocalStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
    } catch (e) {
      console.error('Failed to persist candidates to localStorage', e);
    }
  }, [candidates]);

  // Sync JD to LocalStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(JD_STORAGE_KEY, JSON.stringify(jobDescription));
    } catch (e) {
      console.error('Failed to persist JD to localStorage', e);
    }
  }, [jobDescription]);

  const handleRunScreening = async (
    jdText: string,
    resumeFiles: { fileName: string; fileType: string; base64?: string; text?: string }[]
  ) => {
    setIsScreening(true);
    setScreeningProgress(15);

    try {
      // Step 1: Parse/Structured JD
      setScreeningProgress(35);
      const effectiveJd = jdText || jobDescription.rawText || initialJobDescription.rawText;
      try {
        const parsedJdResult = await parseJobDescription(effectiveJd);
        if (parsedJdResult && parsedJdResult.jd) {
          const updatedJd = {
            ...jobDescription,
            ...parsedJdResult.jd,
            rawText: parsedJdResult.rawText || effectiveJd,
          };
          setJobDescription(updatedJd);
        }
      } catch (jdErr) {
        console.warn('JD parse non-blocking fallback:', jdErr);
      }

      setScreeningProgress(65);

      // Step 2: Analyze & Rank Resumes
      const analyzedCandidates = await analyzeResumes(effectiveJd, resumeFiles);
      setScreeningProgress(95);

      if (analyzedCandidates && analyzedCandidates.length > 0) {
        // Tag targetRole accurately
        const currentTargetRole = jobDescription.title || (effectiveJd ? effectiveJd.split('\n')[0].trim().replace(/^#+\s*/, '') : 'Target Role');
        analyzedCandidates.forEach((c) => {
          if (!c.targetRole || c.targetRole === 'Target Role') {
            c.targetRole = currentTargetRole;
          }
        });

        // Add newly analyzed candidates to candidates list (preserving multi-role evaluations)
        setCandidates((prev) => {
          const combined = [...analyzedCandidates, ...prev];
          combined.forEach((c, idx) => {
            c.rank = idx + 1;
            c.topMatch = idx === 0;
          });
          return combined;
        });

        setSelectedCandidate(analyzedCandidates[0]);
      } else {
        throw new Error('No candidate evaluations returned from parser.');
      }

      setScreeningProgress(100);
    } catch (err: any) {
      console.error('Error during AI Screening:', err);
      alert(`Screening Error: ${err.message || 'Unable to analyze resumes at this time'}. Please check your document formats and retry.`);
    } finally {
      setIsScreening(false);
    }
  };

  const handleClearAllCandidates = () => {
    if (window.confirm('Are you sure you want to clear all candidate records? This cannot be undone.')) {
      setCandidates([]);
      setSelectedCandidate(null);
      try {
        localStorage.removeItem(CANDIDATES_STORAGE_KEY);
      } catch (e) {}
    }
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates((prev) => {
      const updated = prev.filter((c) => c.id !== candidateId);
      updated.forEach((c, idx) => {
        c.rank = idx + 1;
        c.topMatch = idx === 0;
      });
      return updated;
    });
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(null);
    }
  };

  const handleLoadSampleData = () => {
    setCandidates(initialCandidates);
    setSelectedCandidate(initialCandidates[0]);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b23] flex flex-col font-sans pb-16 md:pb-0">
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
          onClearCandidates={handleClearAllCandidates}
          onDeleteCandidate={handleDeleteCandidate}
          onLoadSampleData={handleLoadSampleData}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidatesView
          candidates={candidates}
          setActiveTab={setActiveTab}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
          onClearCandidates={handleClearAllCandidates}
          onDeleteCandidate={handleDeleteCandidate}
          onLoadSampleData={handleLoadSampleData}
        />
      )}

      {activeTab === 'utility' && (
        <UtilityView candidates={candidates} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

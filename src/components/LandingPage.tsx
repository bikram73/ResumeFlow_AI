import React from 'react';
import { ActiveTab } from '../types';
import { Footer } from './Footer';

interface LandingPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b23] flex flex-col pt-[72px]">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center mesh-gradient overflow-hidden py-12">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center z-10 w-full">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/20 text-[#003ea8] px-4 py-1.5 rounded-full border border-[#004ac6]/20 mb-8 animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">Next-Gen Talent Acquisition</span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl text-[#191b23] mb-6 leading-tight">
            Screen Hundreds of Resumes in <span className="text-[#004ac6] italic">Minutes</span> with AI
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#434655] max-w-2xl mb-10 leading-relaxed">
            Upload one Job Description and multiple resumes... instantly. Let our neural AI engine rank and analyze talent with surgical precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-[#004ac6] text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-[#004ac6]/20 hover:translate-y-[-2px] transition-all"
            >
              Start Screening
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className="glass-panel text-[#191b23] px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">play_circle</span>
              <span>View Demo</span>
            </button>
          </div>

          {/* Dashboard Mockup Preview */}
          <div className="w-full max-w-5xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8ff] to-transparent z-20 pointer-events-none h-24 bottom-0"></div>
            <div className="glass-panel p-4 md:p-6 rounded-3xl shadow-2xl overflow-hidden border border-white/60">
              <div className="flex flex-col gap-4 text-left">
                {/* Top Stats Row */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px] bg-white/60 p-4 rounded-xl border border-[#c3c6d7]/30">
                    <div className="text-xs font-semibold text-[#737686] mb-1">CANDIDATES ANALYZED</div>
                    <div className="text-2xl font-bold text-[#191b23]">1,284</div>
                  </div>
                  <div className="flex-1 min-w-[200px] bg-white/60 p-4 rounded-xl border border-[#c3c6d7]/30">
                    <div className="text-xs font-semibold text-[#737686] mb-1">AVERAGE MATCH SCORE</div>
                    <div className="text-2xl font-bold text-[#004ac6]">82%</div>
                  </div>
                </div>

                {/* List Preview */}
                <div className="flex flex-col gap-3">
                  {/* Card 1 */}
                  <div 
                    onClick={() => setActiveTab('candidates')}
                    className="bg-white/80 p-4 rounded-xl border border-[#c3c6d7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#004ac6]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#dbe1ff] rounded-full flex items-center justify-center font-bold text-[#00174b]">
                        JD
                      </div>
                      <div>
                        <div className="font-bold text-base text-[#191b23]">Jane Doe</div>
                        <div className="text-xs text-[#737686]">Senior Product Designer</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="hidden sm:flex gap-1.5">
                        <span className="bg-[#8a4cfc]/20 text-[#5a00c6] px-2.5 py-1 rounded text-[10px] font-bold">FIGMA</span>
                        <span className="bg-[#8a4cfc]/20 text-[#5a00c6] px-2.5 py-1 rounded text-[10px] font-bold">REDUX</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-[#004ac6] font-bold text-lg">95% Match</div>
                        <div className="text-[10px] text-[#943700] flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[12px] material-symbols-outlined-filled">auto_awesome</span>
                          AI Analysis Complete
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/80 p-4 rounded-xl border border-[#c3c6d7]/40 flex items-center justify-between opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#eaddff] rounded-full flex items-center justify-center font-bold text-[#25005a]">
                        MS
                      </div>
                      <div>
                        <div className="font-bold text-base text-[#191b23]">Michael Smith</div>
                        <div className="text-xs text-[#737686]">UI Architect</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[#434655] font-bold text-lg">78% Match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section: Bento Grid */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3">Unmatched Screening Power</h2>
            <p className="text-[#434655] max-w-xl mx-auto text-base">
              Precision-engineered tools to eliminate manual resume review fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 bg-[#f3f3fe] rounded-3xl p-8 border border-[#c3c6d7]/20 hover:shadow-xl transition-all group">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-left">
                  <span className="material-symbols-outlined text-[#004ac6] text-[48px] mb-4 block">psychology</span>
                  <h3 className="font-headline-md text-xl font-bold mb-2">Universal AI Parsing</h3>
                  <p className="text-[#434655] text-sm leading-relaxed">
                    Extract data from any format—PDF, DOCX, or text files—with nearly 100% accuracy. Our LLM-based parser understands intent, not just keywords.
                  </p>
                </div>
                <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden shadow-inner bg-white/50 relative flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-_sDxaj8Hgn3h_moCC9BdYgQrzcClxRVrJkcD_7Vw5jiTq9XKq3erm6KKJzTmrErbEv3Zly-Vk-YJ96s9SyWSgfHFjUPp7EI5PEKMx04RPpmgAa8OLKobprP-tFDsFnOc8niIVTEWmbAMTcWZiFOWOwodMDDv2QnB96jcWI54jPqh0w-LHE03ZA-JNHzq1SUsg30JjfD1JwMV8CaRFBR1qCCDuNIYPjlGWskjIylDIj3xZNA3K5BXg4-z9eLuE8RRy27G_F4jJw')`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#004ac6] to-[#712ae2] p-8 rounded-3xl text-white flex flex-col justify-between text-left">
              <span className="material-symbols-outlined text-[48px] mb-6">leaderboard</span>
              <div>
                <h3 className="font-headline-md text-xl font-bold mb-2">Intelligent Ranking</h3>
                <p className="text-[#eeefff] opacity-90 text-sm leading-relaxed">
                  Instant dynamic ranking based on technical fit, experience, and cultural alignment specified in your JD.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#e1e2ed] rounded-3xl p-8 border border-[#c3c6d7]/20 hover:border-[#004ac6]/50 transition-all text-left">
              <span className="material-symbols-outlined text-[#943700] text-[48px] mb-4 block">visibility</span>
              <h3 className="font-headline-sm text-lg font-bold mb-2">Explainable AI</h3>
              <p className="text-[#434655] text-sm leading-relaxed">
                No black boxes. Get a detailed breakdown of why a candidate received their specific score and where they may be lacking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 bg-[#f3f3fe] rounded-3xl p-8 border border-[#c3c6d7]/20 flex items-center justify-between gap-6 text-left">
              <div className="flex-1">
                <h3 className="font-headline-md text-xl font-bold mb-2">One-Click Export & Persistence</h3>
                <p className="text-[#434655] text-sm leading-relaxed">
                  Export structured rankings as CSV or JSON reports. Browser-local persistence keeps your screened talent pool secure across sessions.
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-[#004ac6] shadow-sm">
                  <span className="material-symbols-outlined">download</span>
                </div>
                <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-[#004ac6] shadow-sm">
                  <span className="material-symbols-outlined">storage</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Detailed Architecture & Methodology Card */}
          <div className="mt-12 bg-gradient-to-r from-[#004ac6]/10 via-[#712ae2]/10 to-[#004ac6]/10 rounded-3xl p-8 md:p-10 border border-[#004ac6]/20 text-left">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#004ac6] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  Advanced Recruitment Intelligence
                </div>
                <h3 className="font-headline-lg text-2xl font-bold mb-3 text-[#191b23]">
                  Multi-Role Re-Screening & Weighted Formula
                </h3>
                <p className="text-[#434655] text-sm md:text-base leading-relaxed mb-6">
                  Test the exact same candidate resume against different Job Descriptions (JDs) simultaneously. ResumeFlow AI dynamically recalibrates match scores, identifies role-specific missing skills, and generates customized evaluation summaries.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Skill Match</div>
                    <div className="text-lg font-bold text-[#004ac6]">40% Weight</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Experience</div>
                    <div className="text-lg font-bold text-[#004ac6]">25% Weight</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Projects</div>
                    <div className="text-lg font-bold text-[#004ac6]">15% Weight</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Education</div>
                    <div className="text-lg font-bold text-[#004ac6]">10% Weight</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Certifications</div>
                    <div className="text-lg font-bold text-[#004ac6]">5% Weight</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#c3c6d7]/40">
                    <div className="text-xs font-semibold text-[#737686]">Soft Skills</div>
                    <div className="text-lg font-bold text-[#004ac6]">5% Weight</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-lg border border-[#c3c6d7]/30 flex flex-col gap-3">
                <div className="font-bold text-sm text-[#191b23] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6]">verified</span>
                  Supported Formats & Parsing
                </div>
                <div className="text-xs text-[#434655] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                    <span>PDF, DOCX, TXT, and Markdown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
                    <span>Scanned Resumes (PNG, JPG, WebP) via OCR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#943700]"></span>
                    <span>Batch processing up to 25+ resumes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section: Horizontal Timeline */}
      <section className="py-20 bg-[#ffffff]" id="workflow">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-center mb-16">The 3-Step Process</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-[#c3c6d7]/30 z-0"></div>

            {/* Step 1 */}
            <div className="flex-1 relative z-10 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 border-2 border-[#004ac6]">
                <span className="material-symbols-outlined text-[#004ac6] text-[40px]">upload_file</span>
              </div>
              <h4 className="font-headline-sm text-lg font-bold mb-2">1. Upload Context</h4>
              <p className="text-[#434655] text-sm px-4">Provide your Job Description and drop all candidate resumes into the hopper.</p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative z-10 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 border-2 border-[#712ae2] ai-pulse">
                <span className="material-symbols-outlined text-[#712ae2] text-[40px]">bolt</span>
              </div>
              <h4 className="font-headline-sm text-lg font-bold mb-2">2. AI Processing</h4>
              <p className="text-[#434655] text-sm px-4">Our advanced AI engine analyzes experience, skills, and nuances within seconds.</p>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative z-10 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 border-2 border-[#943700]">
                <span className="material-symbols-outlined text-[#943700] text-[40px]">fact_check</span>
              </div>
              <h4 className="font-headline-sm text-lg font-bold mb-2">3. Hire Faster</h4>
              <p className="text-[#434655] text-sm px-4">Review rankings, read explainable AI notes, and invite the top 5% to interview.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Capabilities Section */}
      <section className="py-20 bg-[#faf8ff] border-t border-[#c3c6d7]/30">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#004ac6]/10 text-[#004ac6] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Full Feature Matrix
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3">
              Engineered for Precision Recruitment
            </h2>
            <p className="text-[#434655] max-w-2xl mx-auto text-sm md:text-base">
              Every tool and algorithm designed to provide transparent, explainable, and bias-free candidate rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] mb-5">
                <span className="material-symbols-outlined text-2xl">compare</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Side-by-Side Comparison</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Select any two candidates to view real-time score breakdowns across Skills, Experience, Education, Projects, and Certifications.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#712ae2]/10 flex items-center justify-center text-[#712ae2] mb-5">
                <span className="material-symbols-outlined text-2xl">troubleshoot</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Missing Skills Detector</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Instantly flags hard and soft skills required by your Job Description that are absent from the applicant's resume.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] mb-5">
                <span className="material-symbols-outlined text-2xl">shield</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Zero PII Retention</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Parsed resumes and candidate data reside in browser storage. No persistent databases or tracking of private applicant data.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#943700]/10 flex items-center justify-center text-[#943700] mb-5">
                <span className="material-symbols-outlined text-2xl">document_scanner</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Neural Multimodal OCR</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Extracts clean text from scanned images and multi-column visual resumes with layout-aware intelligence.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] mb-5">
                <span className="material-symbols-outlined text-2xl">cached</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Cross-Role Calibration</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Evaluate the same candidate against multiple job descriptions to find alternate placement opportunities across teams.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#712ae2]/10 flex items-center justify-center text-[#712ae2] mb-5">
                <span className="material-symbols-outlined text-2xl">file_download</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold mb-2 text-[#191b23]">Exportable Intelligence</h3>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Download structured ranking reports in CSV or JSON formats for seamless integration with ATS and HR pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-[#c3c6d7]/30">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[#434655] text-sm md:text-base">
              Everything you need to know about ResumeFlow AI's screening algorithms and privacy architecture.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-6 rounded-2xl bg-[#faf8ff] border border-[#c3c6d7]/40">
              <h4 className="font-bold text-base text-[#191b23] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-xl">help</span>
                How are candidate match scores calculated?
              </h4>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                ResumeFlow AI uses a rigorous 6-factor weighted formula: Skill Match (40%), Relevant Experience (25%), Project Alignment (15%), Education (10%), Certifications (5%), and Soft Skills (5%).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8ff] border border-[#c3c6d7]/40">
              <h4 className="font-bold text-base text-[#191b23] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-xl">help</span>
                What file types are supported for resume uploads?
              </h4>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                You can upload PDF files, Microsoft Word (.docx), plain text (.txt, .md), and scanned image resumes (.png, .jpg, .jpeg, .webp).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8ff] border border-[#c3c6d7]/40">
              <h4 className="font-bold text-base text-[#191b23] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-xl">help</span>
                Can I evaluate the same resume for different roles?
              </h4>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                Yes! When you change the Job Description and re-screen, the engine dynamically recalculates the candidate's scores, highlights role-specific strengths, and displays the exact target role on each candidate card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8ff] border border-[#c3c6d7]/40">
              <h4 className="font-bold text-base text-[#191b23] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-xl">help</span>
                Is applicant data kept private and secure?
              </h4>
              <p className="text-[#434655] text-xs md:text-sm leading-relaxed">
                All resume analysis and extraction is processed securely via server-side proxies, and candidate records are stored strictly in your browser session for maximum data sovereignty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 bg-[#faf8ff]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
              <div>
                <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-4">Deep Insights into Your Pipeline</h2>
                <p className="text-[#434655] mb-8 text-base leading-relaxed">
                  Visualize talent density, skill gaps, and diversity metrics before you even start interviewing. ResumeFlow AI provides high-level analytics to help you refine your job descriptions in real-time.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <span className="font-semibold text-sm">Multi-role JD re-screening with adaptive scoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <span className="font-semibold text-sm">Multimodal OCR for PDF, DOCX, TXT, and scanned images</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div 
                  className="w-full aspect-square bg-cover bg-center rounded-2xl shadow-xl border border-[#c3c6d7]/30"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAniaeKST6W1WyUnvAx3cviCWVbw4UE6_UwNhUypf6IdUTTEJxWdRYwgkhoTw2P829sZXh3ZQc6z4kgf1RYi79JGiecqklsJjekyn-7fRj-maQEdh0YUHL8kezDNO8Uw3IoOi2NfHUm4DZdrZqORYcOJtxr-NnyH2rCV2_Eh0OTGAqgSUwXcGpU-wq5jfYL6JwKkwZFfKkOfv2jY-1pI_6e9tgiWwIb_T5FXJWvqn-c2eVIRYIUET-OoKOaJzAIAui8xB5IhqhmtQ')`
                  }}
                />
                {/* Floating Glass Card */}
                <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-xl shadow-2xl max-w-[240px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-[#004ac6]">LIVE ANALYSIS</span>
                  </div>
                  <div className="text-lg font-bold">14 Resumes/sec</div>
                  <div className="text-[10px] text-[#737686]">Processing Backend Batch...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-20 bg-[#191b23] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#004ac6]/20 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-display-lg text-2xl md:text-4xl font-bold mb-4">
            Accelerate Your Recruitment Pipeline Today
          </h2>
          <p className="text-[#c3c6d7] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Transform manual resume review into instant, explainable, and multi-role ranked shortlists with ResumeFlow AI.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-[#004ac6] text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-[#0053db] active:scale-95 transition-all shadow-lg shadow-[#004ac6]/30 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">rocket_launch</span>
              <span>Start AI Screening</span>
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base active:scale-95 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-lg">groups</span>
              <span>Explore Candidates</span>
            </button>
            <button
              onClick={() => setActiveTab('utility')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base active:scale-95 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-lg">analytics</span>
              <span>Utility & Metrics</span>
            </button>
          </div>
        </div>
      </section>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

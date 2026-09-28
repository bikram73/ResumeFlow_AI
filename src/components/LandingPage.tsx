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
                <h3 className="font-headline-md text-xl font-bold mb-2">One-Click Export</h3>
                <p className="text-[#434655] text-sm leading-relaxed">
                  Send your shortlist directly to Greenhouse, Lever, or export as a beautifully formatted CSV/PDF report.
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-[#004ac6] shadow-sm">
                  <span className="material-symbols-outlined">download</span>
                </div>
                <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-[#004ac6] shadow-sm">
                  <span className="material-symbols-outlined">share</span>
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
                    <span className="font-semibold text-sm">Average screening time reduced by 94%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <span className="font-semibold text-sm">Skill alignment accuracy of 98.2%</span>
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

      {/* Tech Stack Section */}
      <section className="py-16 bg-[#e1e2ed]/30">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <p className="text-xs text-[#737686] uppercase tracking-widest font-bold mb-8">Built with the World's Most Powerful Tech</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75">
            <span className="font-bold text-base md:text-lg flex items-center gap-2"><span className="material-symbols-outlined text-[#004ac6]">code</span> React</span>
            <span className="font-bold text-base md:text-lg flex items-center gap-2"><span className="material-symbols-outlined text-[#712ae2]">flash_on</span> Node.js</span>
            <span className="font-bold text-base md:text-lg flex items-center gap-2"><span className="material-symbols-outlined text-[#943700]">diamond</span> Neural AI</span>
            <span className="font-bold text-base md:text-lg flex items-center gap-2"><span className="material-symbols-outlined text-[#004ac6]">storage</span> PostgreSQL</span>
            <span className="font-bold text-base md:text-lg flex items-center gap-2"><span className="material-symbols-outlined text-[#712ae2]">cloud</span> Cloud Engine</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#191b23] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#004ac6]/20 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-display-lg text-2xl md:text-4xl font-bold mb-4">Ready to Automate Your Hiring?</h2>
          <p className="text-[#c3c6d7] text-base md:text-lg max-w-2xl mx-auto mb-10">
            Join 500+ enterprises optimizing their talent acquisition with ResumeFlow AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-[#004ac6] text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-[#0053db] transition-all shadow-lg"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => alert('Contacting Sales team...')}
              className="border border-[#c3c6d7] text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/10 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

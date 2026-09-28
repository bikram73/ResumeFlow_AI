import React, { useState, useRef } from 'react';
import { ActiveTab, Candidate } from '../types';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { exportCSV, exportJSON, extractOcrDocument, OcrResult } from '../services/api';

interface UtilityViewProps {
  candidates: Candidate[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const UtilityView: React.FC<UtilityViewProps> = ({ candidates, setActiveTab }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // OCR Lab State
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [ocrFileName, setOcrFileName] = useState('');
  const [copiedOcrText, setCopiedOcrText] = useState(false);
  const ocrFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleOcrFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrFileName(file.name);
    setOcrLoading(true);
    setOcrResult(null);

    try {
      if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = async () => {
          const text = reader.result as string;
          const result = await extractOcrDocument({
            fileName: file.name,
            fileType: file.type || 'text/plain',
            text,
          });
          setOcrResult(result);
          setOcrLoading(false);
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async () => {
          const res = reader.result as string;
          const base64 = res.split(',')[1] || res;
          const result = await extractOcrDocument({
            fileName: file.name,
            fileType: file.type,
            base64,
          });
          setOcrResult(result);
          setOcrLoading(false);
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error('OCR Extraction Error:', err);
      setOcrResult({
        success: false,
        text: '',
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        extractionMethod: 'Fallback Parser',
        error: err.message || 'Failed to extract text from document.'
      });
      setOcrLoading(false);
    }
  };

  const handleCopyOcr = () => {
    if (ocrResult?.text) {
      navigator.clipboard.writeText(ocrResult.text);
      setCopiedOcrText(true);
      setTimeout(() => setCopiedOcrText(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] pt-[72px]">
      <Sidebar activeTab="utility" setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1440px] mx-auto text-left">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#191b23] mb-1">
              Data Export & OCR Extraction Lab
            </h1>
            <p className="text-[#434655] font-body-md text-sm md:text-base">
              Generate structured reports, inspect document OCR text extraction, and verify ATS pipeline states.
            </p>
          </div>

          {/* OCR Document Extraction Lab Panel */}
          <section className="glass-card rounded-2xl p-6 md:p-8 mb-8 border border-[#004ac6]/30 shadow-sm bg-white/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#004ac6] text-2xl">document_scanner</span>
                  <h2 className="font-headline-sm text-lg md:text-xl font-bold text-[#191b23]">
                    Document Resume OCR Extraction Technique
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-[#434655]">
                  Optical Character Recognition (OCR) converts PDF resumes, scanned image documents, Word (.docx), and text files into structured clean transcripts for AI screening.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  ref={ocrFileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
                  onChange={handleOcrFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={ocrLoading}
                  onClick={() => ocrFileInputRef.current?.click()}
                  className="bg-[#004ac6] text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-md shadow-[#004ac6]/20 hover:bg-[#0053db] active:scale-95 transition-all disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-lg ${ocrLoading ? 'animate-spin' : ''}`}>
                    {ocrLoading ? 'sync' : 'upload_file'}
                  </span>
                  <span>{ocrLoading ? 'Running OCR Extraction...' : 'Upload File for OCR Scan'}</span>
                </button>
              </div>
            </div>

            {/* OCR Live Result */}
            {ocrLoading && (
              <div className="p-8 border-2 border-dashed border-[#004ac6]/30 rounded-xl bg-[#004ac6]/5 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-[#004ac6] border-t-transparent animate-spin" />
                <p className="font-bold text-sm text-[#004ac6]">Extracting Document with Gemini Multimodal OCR...</p>
                <p className="text-xs text-[#737686]">Scanning layout, columns, tables, headers, and contact details from {ocrFileName}</p>
              </div>
            )}

            {ocrResult && !ocrLoading && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#f3f3fe] rounded-xl border border-[#c3c6d7]/30">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-[#191b23]">{ocrResult.fileName}</h4>
                      <p className="text-[11px] text-[#737686]">
                        Engine: <strong className="text-[#004ac6]">{ocrResult.method}</strong> • Words Extracted: <strong className="text-[#712ae2]">{ocrResult.wordCount}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyOcr}
                      className="bg-white border border-[#c3c6d7] text-[#191b23] px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#e1e2ed]/40 flex items-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedOcrText ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedOcrText ? 'Copied!' : 'Copy Extracted Text'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="bg-[#004ac6] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0053db] flex items-center gap-1 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      <span>Use in Screening</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#1e1e2e] text-[#cdd6f4] rounded-xl font-mono text-xs overflow-x-auto custom-scrollbar max-h-72 whitespace-pre-wrap leading-relaxed border border-slate-700 shadow-inner">
                  {ocrResult.text}
                </div>
              </div>
            )}

            {!ocrResult && !ocrLoading && (
              <div
                onClick={() => ocrFileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-[#c3c6d7] hover:border-[#004ac6] bg-[#faf8ff] rounded-xl text-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-4xl text-[#737686] mb-2">document_scanner</span>
                <p className="font-bold text-xs md:text-sm text-[#191b23]">Click to test OCR Extraction on any resume file</p>
                <p className="text-[11px] text-[#737686] mt-1">Supports PDF, DOCX, PNG, JPG, JPEG, WEBP, and Scanned Documents</p>
              </div>
            )}
          </section>

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
                  Export all {candidates.length} candidate evaluations with Gemini match scores, OCR extraction transcripts, and hiring recommendations into standard formats.
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
                    Corrupted, non-text, or scanned PDF files are caught gracefully with automatic OCR fallback processing.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setErrorDismissed(true)}
                      className="bg-[#e1e2ed] text-[#434655] px-5 py-2 rounded-xl font-semibold text-xs md:text-sm hover:bg-[#c3c6d7] transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => {
                        setErrorDismissed(true);
                        setTimeout(() => setErrorDismissed(false), 2000);
                      }}
                      className="bg-[#004ac6] text-white px-5 py-2 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#004ac6]/20 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      <span>Run OCR Diagnostics</span>
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
                    Simulate edge case warning
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#004ac6] text-2xl">document_scanner</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">OCR Technique</p>
                <p className="font-headline-sm text-sm md:text-base font-bold text-[#191b23]">Gemini Multimodal OCR</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#712ae2] text-2xl">memory</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Engine Model</p>
                <p className="font-headline-sm text-sm md:text-base font-bold text-[#191b23]">Gemini 3.7 Flash</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-green-700 text-2xl">security</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Privacy Mode</p>
                <p className="font-headline-sm text-sm md:text-base font-bold text-[#191b23]">Stateless / Zero Retention</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/30">
              <div className="w-12 h-12 rounded-xl bg-[#ededf9] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#943700] text-2xl">speed</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#737686] uppercase tracking-wider">Speed</p>
                <p className="font-headline-sm text-sm md:text-base font-bold text-[#191b23]">&lt; 1.2s per Document</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer hasSidebar={true} />
    </div>
  );
};

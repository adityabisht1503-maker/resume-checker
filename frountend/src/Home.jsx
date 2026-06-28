import React from "react";
import { Sparkles, FileText, CheckCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        .hero-gradient {
          background: radial-gradient(circle at top right, #eef2ff, #ffffff);
        }
        .text-gradient {
          background: linear-gradient(45deg, #0d6efd, #0dcaf0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          transition: transform 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
        }
        .step-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #f8f9fa;
        }
      `}</style>

      <div className="min-vh-100 hero-gradient d-flex align-items-center py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            
            {/* LEFT CONTENT */}
            <div className="col-lg-6">
              <div className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                <Sparkles size={14} className="me-1" /> Powered by Gemini 3.5
              </div>
              
              <h1 className="display-3 fw-extrabold mb-3">
                Land Your Dream Job with <span className="text-gradient">ResumeIQ</span>
              </h1>

              <p className="lead text-secondary mb-4 fs-4">
                Don't let a robot reject you. Our AI scans your resume for 
                <strong> ATS compatibility</strong> and provides professional feedback in seconds.
              </p>

              <div className="row g-3 mb-5">
                {[
                  { icon: <ShieldCheck className="text-primary" />, text: "Secure & Private" },
                  { icon: <Zap className="text-primary" />, text: "Instant Analysis" },
                  { icon: <CheckCircle className="text-primary" />, text: "ATS Optimized" }
                ].map((item, i) => (
                  <div key={i} className="col-auto d-flex align-items-center me-3">
                    {item.icon}
                    <span className="ms-2 fw-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-3">
                <button
                  className="btn btn-primary btn-lg px-4 py-3 shadow-sm d-inline-flex align-items-center"
                  onClick={() => navigate("/resume")}
                >
                  Analyze My Resume
                  <ArrowRight className="ms-2" size={20} />
                </button>
                
              </div>
            </div>

            {/* RIGHT CARD - THE "PROCESS" UI */}
            <div className="col-lg-6">
              <div className="card glass-card shadow-lg p-2">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">3 Simple Steps</h4>
                  
                  <div className="mb-4 d-flex align-items-start">
                    <div className="step-icon me-3 shadow-sm">
                      <FileText className="text-primary" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">1. Upload</h6>
                      <p className="text-muted small">Drop your PDF or Docx. No registration required to start.</p>
                    </div>
                  </div>

                  <div className="mb-4 d-flex align-items-start">
                    <div className="step-icon me-3 shadow-sm">
                      <Sparkles className="text-warning" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">2. AI Scan</h6>
                      <p className="text-muted small">We check 20+ parameters including keyword density and formatting.</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="step-icon me-3 shadow-sm">
                      <CheckCircle className="text-success" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">3. Improve</h6>
                      <p className="text-muted small">Get a custom action plan to increase your interview rate by 60%.</p>
                    </div>
                  </div>
                </div>

                {/* MINI SCORE PREVIEW (Purely Visual) */}
                <div className="card-footer bg-white border-0 p-4 pt-0">
                   <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                      <span className="small fw-bold">Average User Score Boost:</span>
                      <span className="badge bg-success">+35%</span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
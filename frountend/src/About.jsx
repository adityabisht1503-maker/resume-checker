import { Info, Code, User, Layers } from "lucide-react";

export default function About() {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* Header */}
              <div className="text-center mb-5">
                <Info className="text-primary mb-3" size={48} />
                <h1 className="fw-bold">About ResumeIQ</h1>
                <p className="text-muted">
                  Learn more about the application and its creator
                </p>
              </div>

              {/* App Info */}
              <div className="card shadow-lg mb-4">
                <div className="card-body p-4">
                  <h4 className="fw-semibold mb-3">Application Details</h4>

                  <ul className="list-unstyled mb-0">
                    <li className="d-flex mb-3">
                      <Layers className="text-secondary me-3" />
                      <span>
                        <strong>Application Name:</strong> ResumeIQ
                      </span>
                    </li>

                    <li className="d-flex mb-3">
                      <Code className="text-secondary me-3" />
                      <span>
                        <strong>Version:</strong> 1.0.0
                      </span>
                    </li>

                    <li className="d-flex mb-3">
                      <User className="text-secondary me-3" />
                      <span>
                        <strong>Developed By:</strong> Your Name Here
                      </span>
                    </li>

                    <li className="d-flex">
                      <Layers className="text-secondary me-3" />
                      <span>
                        <strong>Purpose:</strong> AI-powered resume analysis and ATS optimization
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h4 className="fw-semibold mb-3">Technology Stack</h4>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">⚛️ React.js (Frontend)</li>
                    <li className="mb-2">🟢 Node.js & Express (Backend)</li>
                    <li className="mb-2">🤖 Google Gemini AI (Resume Analysis)</li>
                    <li className="mb-2">📄 PDF & DOCX Parsing (pdf-parse, mammoth)</li>
                    <li className="mb-2">🎨 Bootstrap 5 & Lucide Icons (UI)</li>
                    <li>🌐 REST API Architecture</li>
                  </ul>
                </div>
              </div>

              {/* Footer Note */}
              <p className="text-center text-muted mt-4">
                © {new Date().getFullYear()} ResumeIQ. All rights reserved.
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

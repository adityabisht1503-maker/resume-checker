import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Sparkles, AlertCircle, CheckCircle, User, Crown } from 'lucide-react';
import api from './api';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffectEvent } from 'react';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isplan, setisplan] = useState(false)
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Auto-scroll to answer section when result is available
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        const answerElement = document.getElementById('answer');
        if (answerElement) {
          answerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [result]);


  useEffect(() => {
    
  
    
    setPlan()
  }, [])
  
const setPlan=async()=>{
const response = await api.post('/api/setPlan', {}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
console.log(response);

if (response.data.plan === "Pro") {
    setisplan(true);
  } else {
    setisplan(false);
  }
}




  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setError(null);
        setResult(null);
      } else {
        setError('Please upload a PDF or Word document');
        setFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', file);

      const response = await api.post('/api/auth/Resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      setResult(response.data.data);
      console.log(response.data.data);
      toast.success("Analysed Successfully");
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Analysis failed");
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  const handleGoToPro = () => {
    navigate('/pro'); // Change '/pro' to your actual pro page route
  };

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <div className="min-vh-100 bg-light py-5 position-relative">
        {/* Go Pro Button - Fixed on Left Side */}
     {!isplan?( <button
  onClick={handleGoToPro}
  className="position-fixed border-0 shadow-lg"
  style={{
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
    borderRadius: '50px',
    padding: '14px 28px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    // Premium Gradient
    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
    color: '#fff',
    textShadow: '0px 1px 2px rgba(0,0,0,0.2)',
    letterSpacing: '0.5px'
  }}
>
  <Crown size={22} color="white" />
  GO PRO
</button>):(<></>)}  

        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <Sparkles className="text-primary me-2" size={40} style={{display: 'inline'}} />
              Resume Analyzer
            </h1>
            <p className="lead text-muted">Upload your resume and get AI-powered feedback</p>
            <p className="lead text-muted">{!isplan?("2 Free attempt per day"):("15 attempts a day")}</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg mb-4">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Upload Resume</label>
                    <div className="border border-2 border-dashed rounded p-5 text-center bg-light">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="d-none"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                        <Upload className="text-secondary mb-3" size={48} />
                        <p className="mb-2 text-dark">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="small text-muted">PDF, DOC, or DOCX (max 10MB)</p>
                      </label>
                    </div>
                  </div>

                  {file && (
                    <div className="alert alert-primary d-flex align-items-center mb-4">
                      <FileText className="me-3" size={24} />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{file.name}</div>
                        <small>{(file.size / 1024).toFixed(2)} KB</small>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger d-flex align-items-center mb-4">
                      <AlertCircle className="me-3" size={24} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    onClick={handleAnalyze}
                    disabled={!file || analyzing}
                    className="btn btn-primary btn-lg w-100"
                  >
                    {analyzing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} className="me-2" style={{display: 'inline'}} />
                        Analyze Resume
                      </>
                    )}
                  </button>
                  {loading && <Loader />}
                </div>
              </div>

              {result && (
                <div id='answer' className="card shadow-lg">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                      <h2 className="h3 mb-0 fw-bold">Analysis Results</h2>
                      <div className="d-flex align-items-center">
                        <span className="text-muted me-2">Overall Rating:</span>
                        <span className="display-6 fw-bold text-primary">{result.rating}/10</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="h5 fw-semibold mb-3">
                        <CheckCircle className="text-success me-2" size={24} style={{display: 'inline'}} />
                        Strengths
                      </h3>
                      <ul className="list-unstyled">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="mb-2 d-flex">
                            <span className="text-success me-3 fw-bold">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="h5 fw-semibold mb-3">
                        <AlertCircle className="text-warning me-2" size={24} style={{display: 'inline'}} />
                        Areas for Improvement
                      </h3>
                      <ul className="list-unstyled">
                        {result.improvements.map((improvement, idx) => (
                          <li key={idx} className="mb-2 d-flex">
                            <span className="text-warning me-3 fw-bold">→</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="alert alert-primary">
                      <h3 className="h5 fw-semibold mb-2">Suggestions</h3>
                      <p className="mb-0">{result.suggestions}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
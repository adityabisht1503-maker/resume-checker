import { useState } from "react";
import axios from "axios";
import { Crown, CheckCircle, Sparkles, AlertCircle, ArrowRight, Shield, Zap, Star } from "lucide-react";
import api from "./api";

const Pro = () => {
  const [txnId, setTxnId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const utrRegex =
  /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{12,23}$/;


const isValidUTR = utrRegex.test(txnId);


  const submitTransaction = async () => {
    if (!isValidUTR) return;
    if (!txnId.trim()) {
      setMessage("Please enter transaction ID");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        "http://localhost:3000/api/submit-transaction",
        { transactionId: txnId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessage(res.data.message);
      setSuccess(true);
      setTxnId("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const proFeatures = [
    { icon: <Zap size={20} />, text: "15 per day Resume Analysis" },
    { icon: <Star size={20} />, text: "Priority AI Processing" },
    { icon: <Shield size={20} />, text: "Advanced Suggestions" },
    { icon: <Sparkles size={20} />, text: "Detailed Feedback Reports" }
  ];

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />

      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle p-3 mb-3">
                  <Crown size={48} className="text-warning" />
                </div>
                <h1 className="display-4 fw-bold text-dark mb-3">
                  Upgrade to Pro
                </h1>
                <p className="lead text-muted">
                  Unlock unlimited resume analysis and premium features
                </p>
              </div>

              <div className="row g-4">
                {/* Features Card */}
                <div className="col-lg-6">
                  <div className="card shadow-lg border-0 h-100">
                    <div className="card-body p-4">
                      <h3 className="h4 fw-bold mb-4">Pro Features</h3>
                      
                      <div className="mb-4">
                        {proFeatures.map((feature, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                            <div className="text-warning me-3">
                              {feature.icon}
                            </div>
                            <span className="fw-semibold">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="alert alert-warning border-0 mb-0">
                        <div className="d-flex align-items-start">
                          <AlertCircle size={20} className="me-2 mt-1 flex-shrink-0" />
                          <small>
                            <strong>Limited Time Offer:</strong> Get Pro for just ₹49 (Regular price: ₹99)
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Card */}
                <div className="col-lg-6">
                  <div className="card shadow-lg border-0 h-100">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h3 className="h4 fw-bold mb-3">Complete Payment</h3>
                        <div className="d-flex justify-content-center align-items-baseline mb-3">
                          <span className="text-muted text-decoration-line-through me-2">₹99</span>
                          <span className="display-5 fw-bold text-primary">₹49</span>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="text-center mb-4">
                        <div className="border border-3 border-primary rounded p-3 d-inline-block bg-white">
                          <img
                            src="/resume.png"
                            alt="UPI QR Code"
                            style={{ width: "200px", height: "200px", objectFit: "contain" }}
                          />
                        </div>
                        <p className="small text-muted mt-2 mb-0">
                          Scan QR code to pay via UPI
                        </p>
                      </div>

                      {/* Transaction ID Input */}
                      <div className="mb-3">
                       <input
  type="text"
  className={`form-control form-control-lg ${
    txnId && !isValidUTR ? "is-invalid" : ""
  }`}
  placeholder="Enter your transaction ID"
  value={txnId}
  onChange={(e) => setTxnId(e.target.value.trim())}
  disabled={loading || success}
/>

{txnId && !isValidUTR && (
  <div className="invalid-feedback">
    Please enter a valid UTR / Transaction ID
  </div>
)}

                        <small className="text-muted">
                          You'll receive this after successful payment
                        </small>
                      </div>

                      {/* Message Display */}
                      {message && (
                        <div className={`alert ${success ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-3`}>
                          {success ? (
                            <CheckCircle size={20} className="me-2 flex-shrink-0" />
                          ) : (
                            <AlertCircle size={20} className="me-2 flex-shrink-0" />
                          )}
                          <span>{message}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        onClick={submitTransaction}
                        disabled={loading || success}
                        className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Verifying...
                          </>
                        ) : success ? (
                          <>
                            <CheckCircle size={20} className="me-2" />
                            Activated!
                          </>
                        ) : (
                          <>
                            Submit & Activate Pro
                            <ArrowRight size={20} className="ms-2" />
                          </>
                        )}
                      </button>

                      <div className="text-center mt-3">
                        <small className="text-muted">
                          Activation is instant after verification
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="card border-0 bg-primary bg-opacity-10 mt-4">
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-2">Need Help?</h5>
                  <p className="text-muted mb-0">
                    If you face any issues with payment or activation, contact us at{' '}
                    <a href="mailto:adityabisht1503@gmail.com" className="text-primary fw-semibold">
                      adityabisht1503@gmail.com, 9165080469
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pro;
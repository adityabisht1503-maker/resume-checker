import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ResumeIQ?",
      answer:
        "ResumeIQ is an AI-powered resume analyzer that evaluates your resume for ATS compatibility, strengths, weaknesses, and provides actionable suggestions to improve your chances of getting interviews."
    },
    {
      question: "Is my resume data stored or shared?",
      answer:
        "No. Your resume is processed securely for analysis and is not stored or shared with third parties. Once the analysis is complete, the data is discarded."
    },
    {
      question: "Which file formats are supported?",
      answer:
        "ResumeIQ currently supports PDF, DOC, and DOCX resume formats. Image files are not supported at this time."
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "The analysis is designed to simulate modern ATS systems and recruiter screening practices. While it provides strong guidance, results should be used as recommendations rather than guarantees."
    },
    {
      question: "Does ResumeIQ rewrite my resume?",
      answer:
        "No. ResumeIQ focuses on analyzing and providing improvement suggestions. Future versions may include AI-powered resume rewriting features."
    },
    {
      question: "Is ResumeIQ free to use?",
      answer:
        "Yes. ResumeIQ is currently free to use with limited analysis requests. Premium features may be added in the future."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <HelpCircle className="text-primary mb-3" size={48} />
            <h1 className="fw-bold">Frequently Asked Questions</h1>
            <p className="text-muted">
              Everything you need to know about ResumeIQ
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div className="card mb-3 shadow-sm" key={index}>
                    <button
                      className="btn btn-link text-decoration-none text-start w-100 p-4 d-flex justify-content-between align-items-center"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="fw-semibold text-dark">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`text-muted transition ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openIndex === index && (
                      <div className="card-body pt-0 px-4 pb-4 text-muted">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

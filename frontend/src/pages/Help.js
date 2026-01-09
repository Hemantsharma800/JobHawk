import React, { useState } from 'react';
import './styles/Help.css';

function Help() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'jobs', name: 'Jobs & Applications', icon: '💼' },
    { id: 'profile', name: 'Profile & Settings', icon: '👤' },
    { id: 'account', name: 'Account & Security', icon: '🔒' },
    { id: 'billing', name: 'Billing & Plans', icon: '💳' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' }
  ];

  const faqs = {
    'getting-started': [
      { 
        id: 1, 
        question: 'How do I create my first job application?', 
        answer: 'To create your first job application, click on the "Add New Job" button in the Dashboard or Jobs page. Fill in the job details including company name, position, and requirements. You can also upload job descriptions or paste URLs for automatic parsing.' 
      },
      { 
        id: 2, 
        question: 'How do I track my application status?', 
        answer: 'You can track your application status by navigating to the Jobs page. Each job listing shows its current status (Applied, Interview, Offer, etc.). Click on any job to see detailed tracking information and update the status as it progresses.' 
      },
      { 
        id: 3, 
        question: 'Can I import jobs from other platforms?', 
        answer: 'Yes! You can import jobs from LinkedIn, Indeed, and other platforms using our browser extension or by uploading CSV files. Go to Settings → Import Data to see all available import options.' 
      }
    ],
    'jobs': [
      { 
        id: 4, 
        question: 'How do I schedule interviews?', 
        answer: 'When a job moves to the interview stage, you can schedule interviews directly from the job details page. Click "Schedule Interview" to set date, time, and add meeting links. You\'ll receive reminders before each interview.' 
      },
      { 
        id: 5, 
        question: 'Can I set reminders for follow-ups?', 
        answer: 'Yes! For each job application, you can set custom reminders. Click the "Set Reminder" button on any job card to create follow-up reminders for interviews, thank-you notes, or status checks.' 
      }
    ],
    'profile': [
      { 
        id: 6, 
        question: 'How do I update my profile information?', 
        answer: 'Navigate to the Profile page and click the "Edit Profile" button. You can update your personal information, skills, experience, and bio. Remember to save your changes when done.' 
      }
    ]
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const contactMethods = [
    { type: 'email', label: 'Email Support', value: 'support@jobhawk.com', icon: '📧' },
    { type: 'chat', label: 'Live Chat', value: 'Available 24/7', icon: '💬' },
    { type: 'phone', label: 'Phone Support', value: '+1 (800) 123-4567', icon: '📞' },
    { type: 'docs', label: 'Documentation', value: 'Read our guides', icon: '📚' }
  ];

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Help & Support</h1>
        <p className="help-subtitle">Find answers, guides, and contact support</p>
      </div>

      <div className="help-search">
        <div className="search-container">
          <input type="text" placeholder="Search for help articles, guides, or FAQs..." />
          <button>Search</button>
        </div>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="contact-section">
            <h3>Contact Support</h3>
            <div className="contact-methods">
              {contactMethods.map(method => (
                <div key={method.type} className="contact-method">
                  <span className="contact-icon">{method.icon}</span>
                  <div>
                    <h4>{method.label}</h4>
                    <p>{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="help-main">
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <p className="section-subtitle">Browse through common questions about {categories.find(c => c.id === activeCategory)?.name}</p>
            
            <div className="faq-list">
              {faqs[activeCategory]?.map(faq => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    <span className="faq-toggle">
                      {expandedFaq === faq.id ? '−' : '+'}
                    </span>
                  </div>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {(!faqs[activeCategory] || faqs[activeCategory].length === 0) && (
              <div className="no-faqs">
                <p>No FAQs available for this category yet. Check back soon or contact support.</p>
              </div>
            )}
          </div>

          <div className="resources-section">
            <h3>Quick Resources</h3>
            <div className="resources-grid">
              <div className="resource-card">
                <span className="resource-icon">📖</span>
                <h4>User Guide</h4>
                <p>Complete guide to all features</p>
                <button className="resource-btn">Read Guide</button>
              </div>
              
              <div className="resource-card">
                <span className="resource-icon">🎥</span>
                <h4>Video Tutorials</h4>
                <p>Step-by-step video guides</p>
                <button className="resource-btn">Watch Videos</button>
              </div>
              
              <div className="resource-card">
                <span className="resource-icon">📝</span>
                <h4>API Documentation</h4>
                <p>Developer API references</p>
                <button className="resource-btn">View API Docs</button>
              </div>
              
              <div className="resource-card">
                <span className="resource-icon">🔄</span>
                <h4>What's New</h4>
                <p>Latest features & updates</p>
                <button className="resource-btn">See Updates</button>
              </div>
            </div>
          </div>

          <div className="support-form">
            <h3>Still Need Help?</h3>
            <p>Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.</p>
            
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="What do you need help with?" />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  placeholder="Describe your issue in detail..." 
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;

import React, { useState, useMemo, useCallback } from 'react';
import { electionData } from './data/electionData';
import { analytics } from './lib/firebase';
import { logEvent } from 'firebase/analytics';
import { GoogleGenerativeAI } from '@google/generative-ai';
import InteractiveMap from './components/InteractiveMap';
import { Globe, Clock, Users, AlertTriangle, MessageSquare, ArrowRight, X, Home, Map as MapIcon, Loader2 } from 'lucide-react';
import './App.css';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function App() {
  const [view, setView] = useState('dashboard');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [activePhaseId, setActivePhaseId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! I am your Election Education Assistant powered by Gemini. Select a phase on the left to learn more, or ask me a question below.' }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const countries = useMemo(() => Object.keys(electionData), []);
  const timelineData = useMemo(() => electionData[selectedCountry], [selectedCountry]);
  
  const activePhase = useMemo(() => activePhaseId 
    ? timelineData.find(phase => phase.id === activePhaseId) 
    : null, [activePhaseId, timelineData]);

  const handleCountryChange = useCallback((country) => {
    setSelectedCountry(country);
    setActivePhaseId(null);
    setChatMessages([
      { type: 'bot', text: `You are now viewing the election process for ${country}. Feel free to ask any questions!` }
    ]);
    if (analytics) {
      logEvent(analytics, 'select_content', {
        content_type: 'country',
        item_id: country
      });
    }
  }, []);

  const [chatInput, setChatInput] = useState("");

  const handleChatPreset = async (question) => {
    const newMessages = [...chatMessages, { type: 'user', text: question }];
    setChatMessages(newMessages);
    setIsBotTyping(true);
    
    try {
      const prompt = `You are a helpful and concise election education assistant. The user is asking about the election process in ${selectedCountry}. Answer this question briefly in 2-3 sentences: ${question}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setChatMessages(prev => [...prev, { type: 'bot', text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatMessages(prev => [...prev, { type: 'bot', text: "Sorry, I encountered an error connecting to the AI. Please try again." }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleChatSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const question = chatInput.trim();
    const newMessages = [...chatMessages, { type: 'user', text: question }];
    setChatMessages(newMessages);
    setChatInput("");

    if (analytics) {
      logEvent(analytics, 'chat_message_sent', {
        question_length: question.length
      });
    }
    
    setIsBotTyping(true);
    
    try {
      const prompt = `You are a helpful and concise election education assistant. The user is currently viewing the timeline for ${selectedCountry}. 
      They are asking the following question: "${question}". 
      If the question is about an election process, answer it specifically in the context of ${selectedCountry}. 
      Keep your answer educational, accurate, and concise (3-4 sentences max). Avoid formatting with markdown if possible.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setChatMessages(prev => [...prev, { type: 'bot', text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatMessages(prev => [...prev, { type: 'bot', text: "Sorry, I'm having trouble connecting to my AI brain. Please check your internet connection and try again." }]);
    } finally {
      setIsBotTyping(false);
    }
  }, [chatInput, chatMessages, selectedCountry]);

  if (view === 'dashboard') {
    return (
      <div className="dashboard-view animate-fade-in">
        <div className="dashboard-content glass">
          <Globe className="text-primary mb-4" size={64} color="#3b82f6" />
          <h1 className="dashboard-title">Election Education Assistant</h1>
          <p className="dashboard-subtitle">Explore the democratic electoral process, timelines, and voting centers of countries around the world.</p>
          
          <button className="explore-btn" onClick={() => setView('app')} aria-label="Explore Timelines">
            <MapIcon size={20} aria-hidden="true" />
            Explore Timelines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header glass animate-fade-in" role="banner">
        <div 
          className="title-section" 
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }} 
          onClick={() => setView('dashboard')} 
          onKeyDown={(e) => e.key === 'Enter' && setView('dashboard')}
          role="button"
          tabIndex={0}
          aria-label="Back to Dashboard"
          title="Back to Dashboard"
        >
          <Home className="text-primary" size={28} color="#3b82f6" aria-hidden="true" />
          <h1 className="title hover-shrink">Election Education Assistant</h1>
        </div>
        
        <div className="country-selector">
          {countries.map(country => (
            <button
              key={country}
              className={`country-btn ${selectedCountry === country ? 'active' : ''}`}
              onClick={() => handleCountryChange(country)}
              aria-label={`Select ${country}`}
              aria-pressed={selectedCountry === country}
            >
              {country}
            </button>
          ))}
        </div>
      </header>

      {/* Main Layout */}
      <main className="main-content">
        
        {/* Left Column: Stepper Timeline */}
        <section className="timeline-section animate-fade-in">
          <h2>Election Timeline: {selectedCountry}</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>Click on any phase to learn more.</p>
          
          <div className="stepper-container">
            {timelineData.map((phase, index) => (
              <div 
                key={phase.id}
                className={`step-item ${activePhaseId === phase.id ? 'active' : ''}`}
                onClick={() => setActivePhaseId(phase.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActivePhaseId(phase.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${phase.title}`}
                aria-expanded={activePhaseId === phase.id}
              >
                <div 
                  className="step-indicator"
                  style={{ color: phase.colorCode, borderColor: activePhaseId === phase.id ? phase.colorCode : 'var(--bg-darker)' }}
                >
                  {index + 1}
                </div>
                <div className="step-content">
                  <h3 className="step-title" style={{ color: phase.colorCode }}>{phase.title}</h3>
                  <div className="step-duration">
                    <Clock size={14} /> {phase.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Center Column: Phase Details */}
        <section className="details-section">
          {activePhase ? (
            <div className="details-card glass animate-fade-in" style={{ borderTop: `4px solid ${activePhase.colorCode}` }}>
              <div className="details-header">
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flex: 1 }}>
                  <div className="details-icon" style={{ color: activePhase.colorCode }}>
                    <Globe size={32} />
                  </div>
                  <div>
                    <h2 className="details-title">{activePhase.title}</h2>
                    <div className="step-duration" style={{ fontSize: '1rem' }}>
                      <Clock size={16} /> {activePhase.duration}
                    </div>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setActivePhaseId(null)} aria-label="Close Details" title="Close Details">
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              
              <p className="details-description">{activePhase.description}</p>
              
              <div className="details-grid">
                <div className="details-box">
                  <div className="box-title">
                    <Users size={16} /> Key Stakeholders
                  </div>
                  <div>
                    {activePhase.stakeholders.map((sh, i) => (
                      <span key={i} className="stakeholder-tag">{sh}</span>
                    ))}
                  </div>
                </div>
                
                <div className="details-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                  <div className="box-title" style={{ color: '#b91c1c' }}>
                    <AlertTriangle size={16} /> What can go wrong?
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#7f1d1d', fontWeight: 500 }}>
                    {activePhase.exceptions}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="map-container" style={{ height: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h3>Voting Centers: {selectedCountry}</h3>
                <p style={{ fontSize: '0.9rem' }}>Select a phase from the timeline on the left to view details, or explore mockup polling stations on the map below.</p>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <InteractiveMap selectedCountry={selectedCountry} />
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Chatbot */}
        <aside className="chatbot-section glass">
          <div className="chat-header">
            <MessageSquare size={20} color="#8b5cf6" />
            Civic Guide FAQ
          </div>
          
          <div className="chat-messages" aria-live="polite" aria-atomic="false">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isBotTyping && (
              <div className="message bot flex items-center gap-2" role="status">
                <Loader2 className="animate-spin" size={16} aria-hidden="true" /> Thinking...
              </div>
            )}
          </div>
          
          <div className="chat-presets">
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 500}} id="suggested-questions">Suggested questions:</p>
            <button className="preset-btn" onClick={() => handleChatPreset("How does voting work?")} aria-labelledby="suggested-questions">
              How does voting work?
            </button>
            <button className="preset-btn" onClick={() => handleChatPreset("What happens if two candidates tie?")} aria-labelledby="suggested-questions">
              What happens if two candidates tie?
            </button>
          </div>
          
          <form className="chat-input-area" onSubmit={handleChatSubmit}>
            <input 
              type="text" 
              placeholder="Ask about constitutions, laws..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="chat-input"
              aria-label="Type your question"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send Message">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        </aside>
      </main>
    </div>
  );
}

export default App;

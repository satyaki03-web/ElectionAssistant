import React, { useState } from 'react';
import { electionData } from './data/electionData';
import InteractiveMap from './components/InteractiveMap';
import { Globe, Clock, Users, AlertTriangle, MessageSquare, ArrowRight, X, Home, Map as MapIcon } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [activePhaseId, setActivePhaseId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! I am your Election Education Assistant. Select a phase on the left to learn more, or ask me a question below.' }
  ]);

  const countries = Object.keys(electionData);
  const timelineData = electionData[selectedCountry];
  
  const activePhase = activePhaseId 
    ? timelineData.find(phase => phase.id === activePhaseId) 
    : null;

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setActivePhaseId(null);
    setChatMessages([
      { type: 'bot', text: `You are now viewing the election process for ${country}. Feel free to ask any questions!` }
    ]);
  };

  const [chatInput, setChatInput] = useState("");

  const handleChatPreset = (question) => {
    const newMessages = [...chatMessages, { type: 'user', text: question }];
    setChatMessages(newMessages);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "That's a great question! In general, the election commission ensures fairness by monitoring all activities. If anything goes wrong, there are legal frameworks in place to challenge the outcome.";
      
      if (question.includes("tie")) {
        if (selectedCountry === 'UK') botResponse = "In the UK, if there is an exact tie (a 'dead heat'), the Returning Officer decides the winner by drawing straws or tossing a coin!";
        if (selectedCountry === 'USA') botResponse = "In the US Electoral College, if no candidate reaches 270 votes (a tie or 3rd party split), the House of Representatives chooses the President.";
        if (selectedCountry === 'India') botResponse = "In India, if there's a tie, the Returning Officer draws a lot (like a lottery) to decide the winner.";
      } else if (question.includes("voting work")) {
        botResponse = `In ${selectedCountry}, the voting process mainly involves registered citizens visiting a polling booth on Election Day. Make sure you check the "Voting Day" phase on the timeline for specific details!`;
      }
      
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 800);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const question = chatInput.trim();
    const newMessages = [...chatMessages, { type: 'user', text: question }];
    setChatMessages(newMessages);
    setChatInput("");
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = `That's an excellent question about the ${selectedCountry} system! While I'm currently a prototype without a live database, issues relating to "${question}" are typically governed by the national constitution and electoral laws of ${selectedCountry}.`;
      
      const lowerQ = question.toLowerCase();
      if (lowerQ.includes("constitution") || lowerQ.includes("law")) {
         botResponse = `The constitution is the supreme law of the land. In ${selectedCountry}, all electoral laws must align with it. If a law is challenged, the highest courts will review its constitutional validity.`;
      } else if (lowerQ.includes("president") || lowerQ.includes("prime minister")) {
         botResponse = `The head of state/government in ${selectedCountry} plays a crucial role. Check out the "Power Transition" phase on the timeline for details on how they take office!`;
      } else if (lowerQ.includes("age") || lowerQ.includes("old") || lowerQ.includes("eligible")) {
         botResponse = `In most democracies, including ${selectedCountry}, the standard voting age is 18. Candidate age requirements are often higher (e.g., 25 or 35 depending on the office).`;
      }
      
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  if (view === 'dashboard') {
    return (
      <div className="dashboard-view animate-fade-in">
        <div className="dashboard-content glass">
          <Globe className="text-primary mb-4" size={64} color="#3b82f6" />
          <h1 className="dashboard-title">Election Education Assistant</h1>
          <p className="dashboard-subtitle">Explore the democratic electoral process, timelines, and voting centers of countries around the world.</p>
          
          <button className="explore-btn" onClick={() => setView('app')}>
            <MapIcon size={20} />
            Explore Timelines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header glass animate-fade-in">
        <div className="title-section" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setView('dashboard')} title="Back to Dashboard">
          <Home className="text-primary" size={28} color="#3b82f6" />
          <h1 className="title hover-shrink">Election Education Assistant</h1>
        </div>
        
        <div className="country-selector">
          {countries.map(country => (
            <button
              key={country}
              className={`country-btn ${selectedCountry === country ? 'active' : ''}`}
              onClick={() => handleCountryChange(country)}
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
                <button className="close-btn" onClick={() => setActivePhaseId(null)} title="Close Details">
                  <X size={24} />
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
          
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="chat-presets">
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 500}}>Suggested questions:</p>
            <button className="preset-btn" onClick={() => handleChatPreset("How does voting work?")}>
              How does voting work?
            </button>
            <button className="preset-btn" onClick={() => handleChatPreset("What happens if two candidates tie?")}>
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
            />
            <button type="submit" className="chat-send-btn">
              <ArrowRight size={18} />
            </button>
          </form>
        </aside>
      </main>
    </div>
  );
}

export default App;

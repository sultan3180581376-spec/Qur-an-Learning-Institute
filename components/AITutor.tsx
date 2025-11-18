import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Play, Pause, Bot, RefreshCw, Globe, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { LANGUAGES } from '../constants';

export const AITutor: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', sender: 'bot', text: selectedLang.greeting, type: 'text' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset messages on language change
  useEffect(() => {
     setMessages([{ id: Date.now().toString(), sender: 'bot', text: selectedLang.greeting, type: 'text' }]);
  }, [selectedLang]);

  const handleLanguageChange = (langCode: string) => {
    const lang = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
    setSelectedLang(lang);
  };

  // Simulated Fast Feedback
  const generateFastFeedback = async () => {
     // Simulate network delay
     await new Promise(resolve => setTimeout(resolve, 1500));

      const feedbackText = "Good effort! Your pronunciation of 'Raa' needs to be heavier. Try lifting the back of your tongue.";
      
      const botResponse: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        text: feedbackText,
        type: 'correction',
        correctionData: {
          mistake: 'Tajweed Rule (Ra Tafkheem)',
          explanation: feedbackText,
          score: Math.floor(Math.random() * (95 - 70 + 1)) + 70
        }
      };
      
      setMessages(prev => [...prev, botResponse]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userText = inputText;
    setInputText('');
    
    // Add user message
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setIsProcessing(true);

    // Simulate AI thinking
    setTimeout(() => {
        const botResponse: Message = {
            id: Date.now().toString(),
            sender: 'bot',
            text: `[AI Simulation] You said: "${userText}". In a real lesson, I would explain the grammar or Tajweed rule related to this.`,
        };
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
    }, 1000);
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      const newMsg: Message = { 
        id: Date.now().toString(), 
        sender: 'user', 
        text: "🎤 [Audio Recitation]",
        type: 'text' 
      };
      setMessages(prev => [...prev, newMsg]);
      
      // Simulate audio processing
      generateFastFeedback().then(() => setIsProcessing(false));

    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Chat Header */}
      <div className="bg-midnight p-4 flex items-center justify-between text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mr-3">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-heading font-semibold">Ustad AI</h3>
            <div className="flex items-center text-xs text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative group">
             <button className="p-2 hover:bg-slate-700 rounded-full transition-colors flex items-center">
               <Globe size={18} />
               <span className="ml-1 text-xs uppercase">{selectedLang.code}</span>
             </button>
             <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-100 hidden group-hover:block z-20">
               {LANGUAGES.map(lang => (
                 <button 
                   key={lang.code}
                   onClick={() => handleLanguageChange(lang.code)}
                   className={`block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 text-slate-700 ${selectedLang.code === lang.code ? 'font-bold text-emerald-600' : ''}`}
                 >
                   {lang.name}
                 </button>
               ))}
             </div>
          </div>
          <button onClick={() => setMessages([{ id: Date.now().toString(), sender: 'bot', text: selectedLang.greeting }])} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
            } ${selectedLang.code === 'ur' || selectedLang.code === 'ar' ? 'font-arabic text-right dir-rtl' : ''}`}>
              <p className="text-sm leading-relaxed" dir={selectedLang.code === 'ur' || selectedLang.code === 'ar' && msg.sender === 'bot' ? 'rtl' : 'ltr'}>
                {msg.text}
              </p>
              
              {msg.type === 'correction' && msg.correctionData && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide flex items-center">
                      <AlertCircle size={12} className="mr-1" /> Feedback
                    </span>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">Score: {msg.correctionData.score}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2"><span className="font-semibold">Note:</span> {msg.correctionData.explanation}</p>
                  <button className="flex items-center text-xs text-emerald-600 font-semibold hover:underline">
                    <Play size={12} className="mr-1" /> Listen
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMicClick}
            className={`p-3 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse shadow-lg ring-4 ring-red-100' 
                : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600'
            }`}
          >
            {isRecording ? <Pause size={20} /> : <Mic size={20} />}
          </button>
          <div className="flex-grow relative">
             <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isRecording ? "Listening..." : selectedLang.code === 'ur' ? "پیغام لکھیں..." : "Type a message..."}
              disabled={isRecording}
              dir={selectedLang.code === 'ur' || selectedLang.code === 'ar' ? 'rtl' : 'ltr'}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isRecording}
            className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
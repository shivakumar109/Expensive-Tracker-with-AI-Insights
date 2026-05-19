import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../Services/axiosInstance';
import { FiCpu, FiSend, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AiInsights = () => {
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(true);
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const res = await axiosInstance.get('/ai-api/suggestions');
      setInsights(res.data.payload);
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { sender: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setChatLoading(true);

    try {
      const res = await axiosInstance.post('/ai-api/chat', { message: userMsg.text });
      const aiMsg = { sender: 'ai', text: res.data.payload };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full px-4 sm:px-6 lg:px-8 py-8">
      {/* AI Insights Panel */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col h-full max-h-[80vh]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FiCpu className="mr-3 text-blue-400" /> Financial Insights
          </h2>
          <button 
            onClick={fetchInsights} 
            disabled={loadingInsights}
            className="p-2 text-slate-400 hover:text-white bg-slate-700 rounded-full transition-all"
          >
            <FiRefreshCw className={loadingInsights ? 'animate-spin' : ''} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-slate-300 leading-relaxed whitespace-pre-wrap">
          {loadingInsights ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="animate-pulse">Analyzing your finances...</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: insights.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*(.*?)/g, '<br/>• $1') }} />
          )}
        </div>
      </div>

      {/* AI Chatbot Panel */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col h-full max-h-[80vh]">
        <div className="mb-6 pb-4 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white flex items-center">
            Ask ExpAI
          </h2>
          <p className="text-sm text-slate-400 mt-1">Get personalized advice based on your spending.</p>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-500 text-center px-4">
              Try asking "How can I save more?" or "Where am I spending the most?"
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-700 text-slate-200 rounded-tl-none border border-slate-600'
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl rounded-tl-none px-4 py-3 flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="relative mt-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={chatLoading || !inputMessage.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors"
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiInsights;
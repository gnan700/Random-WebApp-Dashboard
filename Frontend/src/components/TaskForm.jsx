import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      const input = e.target.querySelector('input[type="text"]');
      input.classList.add('shake-animation');
      setTimeout(() => input.classList.remove('shake-animation'), 500);
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onSubmit({ 
      title: title.trim(), 
      description: description.trim(),
      dueDate,
      priority,
      completed: false
    });
    
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setIsExpanded(false);
    setIsSubmitting(false);
  };

  const getPriorityColor = (level) => {
    const colors = {
      low: "from-green-500 to-emerald-400",
      medium: "from-blue-500 to-cyan-400", 
      high: "from-orange-500 to-red-400",
      urgent: "from-red-500 to-pink-400"
    };
    return colors[level] || colors.medium;
  };

  const handleQuickAdd = () => {
    if (title.trim()) {
      handleSubmit(new Event('submit'));
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="relative">
      {/* Always Visible Add Task Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Task Manager</h2>
          <p className="text-purple-200/60 text-sm">Organize your cosmic missions</p>
        </div>
        
        {/* Primary Add Task Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Main Form Container */}
      <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-20 opacity-70 hover:opacity-100'
      }`}>
        {/* Form Header - Always Clickable */}
        <div 
          className="p-6 cursor-pointer hover:bg-white/5 transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                isExpanded ? 'rotate-45' : ''
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Create New Mission</h2>
                <p className="text-purple-200/60 text-sm">
                  {isExpanded ? 'Fill in the mission details below' : 'Click to expand and create a new task'}
                </p>
              </div>
            </div>
            <div className={`transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expandable Form Content */}
        <div className={`transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <form onSubmit={handleSubmit} className="p-6 border-t border-white/10">
            <div className="space-y-6">
              {/* Task Title */}
              <div className="group">
                <label className="flex items-center gap-2 text-purple-200 text-sm font-medium mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Mission Title *
                </label>
                <input
                  type="text"
                  placeholder="What's your next mission?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-200/40 focus:bg-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div className="group">
                <label className="flex items-center gap-2 text-purple-200 text-sm font-medium mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Mission Briefing
                </label>
                <textarea
                  placeholder="Add mission details, objectives, or notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-200/40 focus:bg-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                />
              </div>

             

              {/* Priority Indicator */}
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(priority)}`}></div>
                <span className="text-purple-200 text-sm">
                  {priority === 'low' && '🟢 This mission can wait'}
                  {priority === 'medium' && '🔵 Standard priority mission'}
                  {priority === 'high' && '🟠 Important mission - focus needed'}
                  {priority === 'urgent' && '🔴 URGENT - Maximum priority!'}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                    setPriority("medium");
                  }}
                  className="flex-1 px-6 py-3 border border-white/20 text-purple-200 rounded-2xl hover:bg-white/5 hover:text-white transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Launching...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Launch Mission
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Action Floating Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={handleQuickAdd}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 group"
        >
          <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: rgba(192, 132, 252, 0.5);
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(192, 132, 252, 0.7);
        }
      `}</style>
    </div>
  );
}
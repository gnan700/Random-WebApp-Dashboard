import { useEffect, useState } from "react";
import { api } from "../api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState("grid"); // grid or list

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      await api.post("/tasks", task);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "all" || 
      (filter === "active" && !task.completed) || 
      (filter === "completed" && task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-b-transparent rounded-full animate-spin mx-auto mb-4" style={{ animationDirection: 'reverse' }}></div>
            </div>
            <p className="text-purple-200 text-lg font-light">Loading your cosmic tasks...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-8 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/10 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Task Manager Active</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Cosmic Dashboard
            </h1>
            <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
              Transform your productivity with interstellar task management
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/60 text-sm font-medium">Total Tasks</p>
                  <p className="text-4xl font-bold text-white mt-2">{totalTasks}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/60 text-sm font-medium">Completed</p>
                  <p className="text-4xl font-bold text-green-400 mt-2">{completedTasks}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/60 text-sm font-medium">Pending</p>
                  <p className="text-4xl font-bold text-orange-400 mt-2">{totalTasks - completedTasks}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-purple-200/60 text-sm font-medium">Progress</p>
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-white font-semibold mt-2">{Math.round(progress)}% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Task Form */}
            <div className="xl:col-span-1">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Create New Task</h2>
                </div>
                <TaskForm onSubmit={addTask} />
              </div>
            </div>

            {/* Right Column - Tasks */}
            <div className="xl:col-span-2">
              {/* Controls */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search across the cosmos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-200/40 focus:bg-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 w-full lg:w-64"
                      />
                      <svg className="w-5 h-5 text-purple-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                      <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          view === "grid" ? "bg-purple-500 text-white" : "text-purple-200 hover:text-white"
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          view === "list" ? "bg-purple-500 text-white" : "text-purple-200 hover:text-white"
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                      {["all", "active", "completed"].map((filterType) => (
                        <button
                          key={filterType}
                          onClick={() => setFilter(filterType)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                            filter === filterType
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : "text-purple-200 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {filterType}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Grid/List */}
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {filteredTasks.length === 0 ? (
                  <div className="col-span-2 text-center py-16">
                    <div className="w-32 h-32 mx-auto mb-6 text-purple-500/20">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-purple-200 text-xl mb-2">No tasks in this galaxy</p>
                    <p className="text-purple-200/60 text-sm">
                      {searchTerm || filter !== "all" 
                        ? "Try adjusting your cosmic search parameters" 
                        : "Launch your first mission by creating a task!"}
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task._id}
                      className={`group relative backdrop-blur-lg rounded-3xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                        task.completed 
                          ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20" 
                          : "bg-gradient-to-br from-purple-500/10 to-blue-500/5 border-purple-500/20"
                      } ${view === "grid" ? "p-6" : "p-8"}`}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        task.completed ? "from-green-500/5 to-emerald-500/5" : "from-purple-500/5 to-blue-500/5"
                      }`}></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Interactive Checkbox */}
                            <button
                              onClick={() => toggleComplete(task._id, task.completed)}
                              className={`mt-1 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                                task.completed
                                  ? "bg-gradient-to-r from-green-400 to-emerald-500 border-transparent shadow-lg shadow-green-500/25"
                                  : "border-purple-400/30 hover:border-green-400 hover:bg-green-500/10"
                              }`}
                            >
                              {task.completed && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>

                            {/* Task Content */}
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-bold text-lg mb-2 transition-all duration-300 ${
                                  task.completed 
                                    ? "line-through text-green-300/60" 
                                    : "text-white"
                                } ${view === "grid" ? "text-base" : "text-lg"}`}
                              >
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className={`mb-3 ${
                                  task.completed ? "text-green-200/40" : "text-purple-200/70"
                                } ${view === "grid" ? "text-sm" : "text-base"}`}>
                                  {task.description}
                                </p>
                              )}
                              
                              {/* Task Meta */}
                              <div className="flex items-center gap-4 text-sm">
                                <span className={`px-3 py-1 rounded-full ${
                                  task.completed 
                                    ? "bg-green-500/20 text-green-300" 
                                    : "bg-purple-500/20 text-purple-300"
                                }`}>
                                  {task.completed ? "Completed" : "In Progress"}
                                </span>
                                {task.dueDate && (
                                  <span className="text-purple-200/50 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <button
                              onClick={() => toggleComplete(task._id, task.completed)}
                              className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                                task.completed
                                  ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                                  : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                              }`}
                              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {task.completed ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                )}
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="p-3 rounded-2xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 transform hover:scale-110"
                              title="Delete task"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
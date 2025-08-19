import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { 
  FiUploadCloud, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiLoader, 
  FiRefreshCw,
  FiMapPin,
  FiCalendar,
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiEdit,
  FiUser,
  FiClock,
  FiTag,
  FiMessageSquare,
  FiCheck,
  FiX,
  FiCamera,
  FiMap,
  FiStar,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import UploadForm from '../components/UploadForm';

const StatusMessage = ({ status }) => {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();
  
  useEffect(() => {
    if (status) {
      setIsVisible(true);
      controls.start('animate');
      
      if (!status.includes('Loading')) {
        const timer = setTimeout(() => {
          controls.start('exit').then(() => setIsVisible(false));
        }, 5000);
        return () => clearTimeout(timer);
      }
    } else {
      controls.start('exit').then(() => setIsVisible(false));
    }
  }, [status, controls]);
  
  const variants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };
  
  const getStatusIcon = () => {
    if (status.includes('Error')) return <FiAlertCircle className="mr-2" />;
    if (status.includes('Loading')) return <FiLoader className="mr-2 animate-spin" />;
    return <FiCheckCircle className="mr-2" />;
  };
  
  const getStatusEmoji = () => {
    if (status.includes('Error')) return '🚨';
    if (status.includes('Loading')) return '⏳';
    if (status.includes('Success')) return '🎉';
    return 'ℹ️';
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate={controls}
          exit="exit"
          className={`flex items-center p-4 rounded-full mt-6 cursor-pointer shadow-lg transition-all duration-300
            ${status.includes('Error') 
              ? 'bg-gradient-to-r from-orange-100 to-rose-200 text-red-700' 
              : status.includes('Loading') 
                ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' 
                : 'bg-gradient-to-r from-lime-100 to-green-200 text-green-800'
            }`}
          role="alert"
          onClick={() => controls.start('exit').then(() => setIsVisible(false))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl mr-3">{getStatusEmoji()}</span>
          <div className="flex items-center font-medium">
            {getStatusIcon()}
            <span>{status}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const IssueCard = ({ issue, index, expanded, toggleExpand }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const uniqueKey = issue.id || `issue-${index}`;
  
  const getStatusColor = () => {
    switch (issue.status?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  const getSeverityColor = () => {
    switch (issue.severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <motion.div
      key={uniqueKey}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-2xl shadow-md p-5 cursor-pointer transition-all duration-300 border border-gray-200 ${expanded ? 'border-indigo-500' : ''}`}
      onClick={toggleExpand}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-4 md:flex-row flex-col">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
          <span>{index + 1}</span>
        </div>
        <div className="flex-1">
          <h5 className="text-lg font-semibold text-gray-800">{issue.title || 'Untitled Issue'}</h5>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {issue.status || 'Pending'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
              {issue.severity || 'Unknown'}
            </span>
          </div>
        </div>
        <div className="text-gray-400 flex-shrink-0">
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 pt-5 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FiMapPin className="text-indigo-500 mt-1 flex-shrink-0" />
                <span>{issue.location || 'No location provided'}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FiCalendar className="text-indigo-500 mt-1 flex-shrink-0" />
                <span>{issue.date ? new Date(issue.date).toLocaleDateString() : 'No date provided'}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FiUser className="text-indigo-500 mt-1 flex-shrink-0" />
                <span>Reported by: {issue.reporter || 'Anonymous'}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FiClock className="text-indigo-500 mt-1 flex-shrink-0" />
                <span>{issue.timestamp ? new Date(issue.timestamp).toLocaleString() : 'No timestamp'}</span>
              </div>
            </div>
            
            <div className="flex mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600 w-full">
                <FiInfo className="text-indigo-500 mt-1 flex-shrink-0" />
                <p>{issue.description || 'No description provided'}</p>
              </div>
            </div>
            
            {issue.category && (
              <div className="flex mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FiTag className="text-indigo-500 mt-1 flex-shrink-0" />
                  <span>Category: {issue.category}</span>
                </div>
              </div>
            )}
            
            {issue.image && (
              <motion.div 
                className="mt-4 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={issue.image} 
                  alt="Issue" 
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4 mt-5">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition">
                <FiEye />
                <span>View Details</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition">
                <FiEdit />
                <span>Edit</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function ReportIssue() {
  const [status, setStatus] = useState('');
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const fetchIssues = async () => {
    setIsLoading(true);
    setStatus('🔍 Loading issues... Please wait');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await fetch('http://localhost:8000/api/issues');
      const data = await response.json();
      const issuesWithIds = data.map((issue, index) => ({
        ...issue,
        id: issue.id || `issue-${index}`,
        title: issue.title || `Issue #${index + 1}`,
        location: issue.location || 'Unknown location',
        date: issue.date || new Date().toISOString(),
        description: issue.description || 'No description provided',
        reporter: issue.reporter || 'Anonymous',
        timestamp: issue.timestamp || new Date().toISOString(),
        status: issue.status || 'pending',
        severity: issue.severity || 'medium',
        category: issue.category || 'general'
      }));
      setIssues(issuesWithIds);
      setStatus('✅ Successfully loaded issues!');
    } catch (error) {
      setStatus('🚨 Error fetching issues. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleExpandIssue = (id) => {
    setExpandedIssue(expandedIssue === id ? null : id);
  };
  
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === '' || 
      issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-4 md:py-8 font-sans"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 md:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)] -rotate-45 -top-1/2 -right-1/2 w-[200%] h-[200%]" />
                <motion.h2 
                  className="text-white text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FiUploadCloud className="text-xl md:text-2xl" />
                  Report a Community Issue 🏘️
                </motion.h2>
              </div>
              
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.p 
                    className="text-gray-600 text-lg md:text-xl text-center mb-8 font-medium"
                    animate={{ color: ['#333', '#333', '#333'] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    Snap a photo 📸 of the problem and our AI will analyze it automatically!
                  </motion.p>
                  
                  <UploadForm setStatus={setStatus} fetchIssues={fetchIssues} />
                  
                  <StatusMessage status={status} />
                </motion.div>
                
                {issues.length > 0 && (
                  <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                  >
                    <motion.div 
                      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
                      variants={itemVariants}
                    >
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <FiRefreshCw className="text-indigo-500" />
                        📋 Recent Community Issues
                      </h3>
                      
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                          />
                        </div>
                        
                        <button 
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition"
                          onClick={() => setShowFilters(!showFilters)}
                        >
                          <FiFilter />
                          <span>Filters</span>
                        </button>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {showFilters && (
                        <motion.div 
                          className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-300"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <span className="font-medium text-gray-600 whitespace-nowrap">Filter by status:</span>
                            <div className="flex flex-wrap gap-2">
                              {statusOptions.map(option => (
                                <button
                                  key={option.value}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border border-gray-300 transition ${filterStatus === option.value ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-600'}`}
                                  onClick={() => setFilterStatus(option.value)}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {filteredIssues.length === 0 ? (
                      <motion.div 
                        className="flex flex-col items-center justify-center p-12 text-center text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="text-5xl mb-4 opacity-50">
                          <FiSearch />
                        </div>
                        <h4 className="text-lg text-gray-600 mb-2">No issues found</h4>
                        <p>Try adjusting your search or filter criteria</p>
                      </motion.div>
                    ) : (
                      <motion.div className="flex flex-col gap-4" variants={containerVariants}>
                        {filteredIssues.slice(0, 5).map((issue, index) => (
                          <IssueCard
                            key={issue.id}
                            issue={issue}
                            index={index}
                            expanded={expandedIssue === issue.id}
                            toggleExpand={() => toggleExpandIssue(issue.id)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
                <motion.button
                  onClick={fetchIssues}
                  disabled={isLoading}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-not-allowed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Refreshing... ♻️</span>
                    </>
                  ) : (
                    <>
                      <FiRefreshCw />
                      <span>Refresh Issues 🔄</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style>{`
        /* Custom styles for elements Tailwind can't fully cover */
        .card-header {
          position: relative;
        }
        .card-header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
          transform: rotate(45deg);
        }
      `}</style>
    </motion.div>
  );
}

export default ReportIssue;
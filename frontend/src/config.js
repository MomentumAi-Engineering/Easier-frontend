const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:8000/api'
  : 'https://eaiser-backend.onrender.com/issues';

export default API_BASE_URL;
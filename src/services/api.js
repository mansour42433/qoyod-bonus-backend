import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const bonusAPI = {
  /**
   * حساب البونص الشهري
   * @param {number} year - السنة
   * @param {number} month - الشهر
   */
  calculateBonus: async (year, month) => {
    const response = await api.get('/api/bonus/calculate', {
      params: { year, month },
    });
    return response.data;
  },

  /**
   * الحصول على بونص فرع معين
   * @param {string} branchName - اسم الفرع
   * @param {number} year - السنة
   * @param {number} month - الشهر
   */
  getBranchBonus: async (branchName, year, month) => {
    const response = await api.get(`/api/bonus/branch/${branchName}`, {
      params: { year, month },
    });
    return response.data;
  },

  /**
   * فحص صحة الاتصال
   */
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;

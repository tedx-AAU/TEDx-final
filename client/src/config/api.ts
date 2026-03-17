// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    admin: {
      login: `${API_URL}/api/admin/login`,
      verify: `${API_URL}/api/admin/verify`,
      ticketsLogin: `${API_URL}/api/admin/tickets-login`,
      ticketsVerify: `${API_URL}/api/admin/tickets-verify`,
    },
    registration: {
      ticketsAvailable: `api/registration/tickets/available`,
      ticketsAdd: `api/registration/tickets/add`,
      registrations: `api/registration/registrations`,
      registrationsAcceptedCount: `api/registration/registrations/accepted/count`,
      registrationsExport: `api/registration/registrations/export`,
      registrationsById: `api/registration/registrations/:id`,
      register: `api/registration/register`,
      sendOtp: `api/registration/send-otp`,
      verifyOtp: `api/registration/verify-otp`,
    },
  },
};

export default apiConfig;

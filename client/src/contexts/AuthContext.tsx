import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { apiConfig } from '../config/api';

interface Admin {
  id: string;
  username: string;
}

interface TicketsAdmin {
  id: string;
  username: string;
}

type UserType = 'admin' | 'ticketsAdmin' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  isTicketsAuthenticated: boolean;
  admin: Admin | null;
  ticketsAdmin: TicketsAdmin | null;
  userType: UserType;
  login: (
    username: string,
    password: string,
    type?: 'admin' | 'ticketsAdmin'
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTicketsAuthenticated, setIsTicketsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [ticketsAdmin, setTicketsAdmin] = useState<TicketsAdmin | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const ticketsToken = localStorage.getItem('ticketsToken');

    if (adminToken) {
      verifyAdminToken(adminToken);
    } else if (ticketsToken) {
      verifyTicketsToken(ticketsToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAdminToken = async (token: string) => {
    try {
      const response = await fetch(apiConfig.endpoints.admin.verify, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
        setUserType('admin');
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        setAdmin(null);
        setUserType(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
      setAdmin(null);
      setUserType(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyTicketsToken = async (token: string) => {
    try {
      const response = await fetch(apiConfig.endpoints.admin.ticketsVerify, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTicketsAdmin(data.ticketsAdmin);
        setUserType('ticketsAdmin');
        setIsTicketsAuthenticated(true);
      } else {
        localStorage.removeItem('ticketsToken');
        setTicketsAdmin(null);
        setUserType(null);
        setIsTicketsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('ticketsToken');
      setTicketsAdmin(null);
      setUserType(null);
      setIsTicketsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(
    async (
      username: string,
      password: string,
      type: 'admin' | 'ticketsAdmin' = 'admin'
    ): Promise<boolean> => {
      try {
        const endpoint =
          type === 'admin'
            ? apiConfig.endpoints.admin.login
            : apiConfig.endpoints.admin.ticketsLogin;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();

          if (type === 'admin') {
            localStorage.setItem('adminToken', data.token);
            setAdmin(data.admin);
            setUserType('admin');
            setIsAuthenticated(true);
          } else {
            localStorage.setItem('ticketsToken', data.token);
            setTicketsAdmin(data.ticketsAdmin);
            setUserType('ticketsAdmin');
            setIsTicketsAuthenticated(true);
          }
          return true;
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData.error);
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    if (userType === 'admin') {
      localStorage.removeItem('adminToken');
      setAdmin(null);
      setIsAuthenticated(false);
    } else if (userType === 'ticketsAdmin') {
      localStorage.removeItem('ticketsToken');
      setTicketsAdmin(null);
      setIsTicketsAuthenticated(false);
    }
    setUserType(null);
  }, [userType]);

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      isTicketsAuthenticated,
      admin,
      ticketsAdmin,
      userType,
      login,
      logout,
      loading,
    }),
    [
      isAuthenticated,
      isTicketsAuthenticated,
      admin,
      ticketsAdmin,
      userType,
      login,
      logout,
      loading,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

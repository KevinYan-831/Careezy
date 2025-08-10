import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin users - in production, this would be handled by your backend
const ADMIN_USERS = [
  {
    id: '1',
    email: 'JixinYan2029@u.northwestern.edu',
    password: 'Yjx060831',
    name: 'Jixin Yan',
    role: 'super_admin' as const
  },
  {
    id: '2',
    email: 'admin@careezy.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  },
  {
    id: '3',
    email: 'superadmin@careezy.com',
    password: 'superadmin123',
    name: 'Super Admin',
    role: 'super_admin' as const
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('adminUser');
    const savedToken = localStorage.getItem('adminToken');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('adminUser');
      }
    }
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Try real backend first
      const res = await axios.post('/api/auth/login', { email, password });
      const roleFromApi = res.data?.user?.role as string | undefined;
      if (roleFromApi === 'admin' || roleFromApi === 'super_admin') {
        const u: User = {
          id: res.data.user.id,
          email: res.data.user.email,
          name: `${res.data.user.firstName || ''} ${res.data.user.lastName || ''}`.trim(),
          role: (roleFromApi as 'admin' | 'super_admin') || 'admin',
        };
        setUser(u);
        setToken(res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(u));
        localStorage.setItem('adminToken', res.data.token);
        setIsLoading(false);
        return true;
      }
    } catch {
      // fallback to demo accounts
    }

    // Demo login fallback (no backend role)
    await new Promise(resolve => setTimeout(resolve, 500));
    const adminUser = ADMIN_USERS.find(
      user => user.email === email && user.password === password
    );
    if (adminUser) {
      const userWithoutPassword = {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      };
      setUser(userWithoutPassword);
      setToken(null);
      localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
      localStorage.removeItem('adminToken');
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
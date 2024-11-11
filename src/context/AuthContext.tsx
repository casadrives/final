import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'driver' | 'admin' | 'company';
  avatar?: string;
  companyId?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'suspended';
  paymentDue?: string;
  lastPaymentDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string; role?: string; companyId?: string }) => Promise<void>;
  registerCompany: (companyData: { name: string; email: string; password: string; phone: string; registrationNumber: string; taxiLicense: string; fleetSize: string }) => Promise<void>;
  registerDriver: (driverData: { name: string; email: string; password: string; companyId: string }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  checkPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts
const demoAccounts = {
  'admin@demo.com': {
    id: 'demo-admin',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin',
    status: 'approved',
    password: 'demo123',
  },
  'company@demo.com': {
    id: 'demo-company',
    name: 'Demo Company',
    email: 'company@demo.com',
    role: 'company',
    status: 'approved',
    password: 'demo123',
  },
  'driver@demo.com': {
    id: 'demo-driver',
    name: 'Demo Driver',
    email: 'driver@demo.com',
    role: 'driver',
    status: 'approved',
    password: 'demo123',
  },
  'client@demo.com': {
    id: 'demo-client',
    name: 'Demo Client',
    email: 'client@demo.com',
    role: 'user',
    password: 'demo123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('casadriveUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUser = demoAccounts[email as keyof typeof demoAccounts];
      
      if (!demoUser || demoUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      localStorage.setItem('casadriveUser', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casadriveUser');
  };

  const register = async (userData: { name: string; email: string; password: string; role?: string; companyId?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'new-user',
        name: userData.name,
        email: userData.email,
        role: (userData.role as User['role']) || 'user',
        companyId: userData.companyId
      };

      setUser(mockUser);
      localStorage.setItem('casadriveUser', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerCompany = async (companyData: { name: string; email: string; password: string; phone: string; registrationNumber: string; taxiLicense: string; fleetSize: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { status: 'pending' };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Company registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerDriver = async (driverData: { name: string; email: string; password: string; companyId: string }) => {
    return register({
      ...driverData,
      role: 'driver'
    });
  };

  const checkPaymentStatus = async () => {
    if (user?.role === 'company' && user.paymentDue) {
      const now = new Date();
      const paymentDue = new Date(user.paymentDue);
      
      if (now > paymentDue) {
        const updatedUser = {
          ...user,
          status: 'suspended' as const
        };
        setUser(updatedUser);
        localStorage.setItem('casadriveUser', JSON.stringify(updatedUser));
        throw new Error('Account suspended due to missed payment');
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      registerCompany,
      registerDriver,
      isLoading,
      error,
      checkPaymentStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
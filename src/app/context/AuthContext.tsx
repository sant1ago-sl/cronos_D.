import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (profile: Partial<Pick<User, 'name' | 'email' | 'institution'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem('cronosUser');
    return savedUser ? JSON.parse(savedUser) as User : null;
  } catch {
    localStorage.removeItem('cronosUser');
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSavedUser());

  const login = (email: string, password: string): boolean => {
    // Mock login - acepta cualquier credencial y determina rol basado en email
    let selectedUser: User;
    
    if (email.includes('admin')) {
      selectedUser = mockUsers.find(u => u.role === 'admin') || mockUsers[2];
    } else if (email.includes('teacher') || email.includes('profesor') || email.includes('docente')) {
      selectedUser = mockUsers.find(u => u.role === 'teacher') || mockUsers[1];
    } else {
      selectedUser = mockUsers.find(u => u.role === 'student') || mockUsers[0];
    }
    
    setUser(selectedUser);
    localStorage.setItem('cronosUser', JSON.stringify(selectedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cronosUser');
  };

  const switchRole = (role: UserRole) => {
    const newUser = mockUsers.find(u => u.role === role);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('cronosUser', JSON.stringify(newUser));
    }
  };

  const updateProfile = (profile: Partial<Pick<User, 'name' | 'email' | 'institution'>>) => {
    setUser(currentUser => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        ...profile
      };

      localStorage.setItem('cronosUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, updateProfile }}>
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

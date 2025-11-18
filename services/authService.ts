import { User } from '../types';

const STORAGE_KEY = 'qli_user'; // Current session
const DB_KEY = 'qli_users_db'; // All users "database"
const ADMIN_EMAIL = "sultan3180581376@gmail.com";

// --- Email Notification Service ---

export const sendEmailNotification = async (subject: string, data: Record<string, any>) => {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `QLI Alert: ${subject}`,
        _captcha: "false", // Disable captcha for direct sending
        _template: "table", // Formats data nicely
        ...data
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to send email notification", error);
    return false;
  }
};

// Helper to safely parse JSON
const safeParse = (key: string, fallback: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
    // Clear corrupted data
    localStorage.removeItem(key);
    return fallback;
  }
};

// Initialize Mock Database if empty
const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    const mockUsers: User[] = [
      {
        id: 'admin-1',
        name: 'Administrator',
        email: 'admin@quran.com',
        role: 'admin',
        status: 'active',
        plan: 'PREMIUM',
        trialEndsAt: Date.now() + 31536000000,
        hasPaid: true,
        progress: []
      },
      {
        id: 'student-1',
        name: 'Sarah Ahmed',
        email: 'sarah@example.com',
        role: 'student',
        status: 'active',
        plan: 'STANDARD',
        trialEndsAt: Date.now() + 86400000,
        hasPaid: true,
        progress: [{ courseId: 'c1', completedLessons: 5, totalLessons: 28 }]
      },
      {
        id: 'student-2',
        name: 'Bilal Khan',
        email: 'bilal@example.com',
        role: 'student',
        status: 'inactive',
        plan: 'TRIAL',
        trialEndsAt: Date.now() - 86400000, // Expired
        hasPaid: false,
        progress: []
      }
    ];
    localStorage.setItem(DB_KEY, JSON.stringify(mockUsers));
  }
};

// --- User Session Management ---

export const getStoredUser = (): User | null => {
  return safeParse(STORAGE_KEY, null);
};

export const loginUser = (email: string): User | null => {
  initDB();
  const users = safeParse(DB_KEY, []);
  const user = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
  
  if (user && user.status === 'active') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const createTrialUser = (name: string, email: string): User => {
  initDB();
  const users = safeParse(DB_KEY, []);
  
  // Check if exists
  const existing = users.find((u: User) => u.email === email);
  if (existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return existing;
  }

  // Trial lasts 3 days (72 hours)
  const trialDuration = 72 * 60 * 60 * 1000; 
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role: 'student',
    status: 'active',
    plan: 'TRIAL',
    trialEndsAt: Date.now() + trialDuration,
    hasPaid: false,
    progress: [] // Start with no progress
  };
  
  users.push(newUser);
  localStorage.setItem(DB_KEY, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// --- Admin Functions ---

export const getAllUsers = (): User[] => {
  initDB();
  return safeParse(DB_KEY, []);
};

export const updateUserStatus = (userId: string, status: 'active' | 'inactive'): User[] => {
  const users = getAllUsers();
  const updatedUsers = users.map(u => 
    u.id === userId ? { ...u, status } : u
  );
  localStorage.setItem(DB_KEY, JSON.stringify(updatedUsers));
  
  return updatedUsers;
};

export const deleteUser = (userId: string): User[] => {
  const users = getAllUsers();
  const filteredUsers = users.filter(u => u.id !== userId);
  localStorage.setItem(DB_KEY, JSON.stringify(filteredUsers));
  return filteredUsers;
};
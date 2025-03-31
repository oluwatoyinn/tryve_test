// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, you would make an API call here
      // For the assessment, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'test@example.com' && password === 'password') {
        const user = { id: 1, email, name: 'Test User' };
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      set({ user, isAuthenticated: true });
    }
  }
}));

export default useAuthStore;


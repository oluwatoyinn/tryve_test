import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        try {
          {
            /**
            @ my description: Since there's no api to call, I am simulating an API call
            while also mocking successful login call
            */
          }
          await new Promise<void>((resolve) => setTimeout(resolve, 1000));

          if (email === "user@example.com" && password === "password") {
            const user: User = { id: 1, email, name: "Victor Ajayi" };
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          } else {
            set({ error: "Invalid credentials", isLoading: false });
            return false;
          }
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          return false;
        }
      },

      logout: (): void => {
        set({ user: null, isAuthenticated: false });
      },
      checkAuth: (): void => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr) as User;
          set({ user, isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
      // storage: localStorage,
    }
  )
);

import { create } from "zustand";
import { axiosClient } from "../library/axiosClient";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware"; // Import createJSONStorage

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
}
interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; error: string }>;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user: User) => set({ user }),
        login: async (email: string, password: string) => {
          try {
            const response = await axiosClient.post(
              "http://localhost:8000/api/v1/auth/login",
              { email, password }
            );

            if (response && response.data.statusCode === 200) {
              const responseProfile = await axiosClient.get(
                "http://localhost:8000/api/v1/auth/profile"
              );

              set({
                user: responseProfile.data.data,
                isAuthenticated: true,
              });

              return { isAuthenticated: true, error: "" };
            } else {
              return {
                isAuthenticated: false,
                error: "Username or password is invalid",
              };
            }
          } catch {
            return {
              isAuthenticated: false,
              error: "Login failed",
            };
          }
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        },
      }),
      {
        name: "auth-storage", // Tên của key lưu trữ
        storage: createJSONStorage(() => sessionStorage), // Lưu trữ trong sessionStorage (tuỳ chọn, mặc định là localStorage)
      }
    )
  )
);

export default useAuth;
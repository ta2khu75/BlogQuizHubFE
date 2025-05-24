import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware'
import { AuthRequest } from "@/types/request/AuthRequest";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import AuthService from '@/services/AuthService';

type AuthState = {
    access_token?: string;
    profile?: AccountProfileResponse
    role?: string
}
type AuthAction = {
    fetchLogin: (data: AuthRequest) => Promise<void>
    fetchLogout: () => Promise<void>
    fetchRefreshToken: () => Promise<void>
    setProfile: (data: AccountProfileResponse) => void
    logout: () => void,
}
export const useAuthStore = create<AuthState & AuthAction>()(persist(immer((set) => ({
    access_token: undefined,
    profile: undefined,
    role: undefined,
    setProfile: (data: AccountProfileResponse) => set((state) => { state.profile = data }),
    logout: () => set({ access_token: undefined, profile: undefined, role: undefined }),
    fetchLogin: async (data: AuthRequest) => {
        const response = await AuthService.login(data)
        set(response.data)
    },
    fetchLogout: async () => {
        await AuthService.logout()
        set({ access_token: undefined, profile: undefined, role: undefined })
    },
    fetchRefreshToken: async () => {
        const response = await AuthService.refreshToken()
        set(response.data)
    }
})), {
    name: 'auth-storage', // Tên key lưu trong localStorage
    partialize: (state) => ({
        access_token: state.access_token,
        profile: state.profile,
        role: state.role
    }),
}))
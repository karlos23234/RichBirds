import { create } from 'zustand';
import { UserProfile } from '../types/richbirds';

interface UserStore {
  profile: UserProfile;
  updateBalance: (amount: number) => void;
  incrementTaskCount: () => void;
  incrementReferralCount: () => void;
  incrementVideoCount: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: {
    username: '@User12897',
    totalBalance: 8000,
    taskCount: 0,
    referralCount: 0,
    videoCount: 0,
    referralLink: 'https://t.me/richrisebot/app?startapp=r_8187899888',
  },
  updateBalance: (amount) =>
    set((state) => ({
      profile: { ...state.profile, totalBalance: state.profile.totalBalance + amount },
    })),
  incrementTaskCount: () =>
    set((state) => ({
      profile: { ...state.profile, taskCount: state.profile.taskCount + 1 },
    })),
  incrementReferralCount: () =>
    set((state) => ({
      profile: { ...state.profile, referralCount: state.profile.referralCount + 1 },
    })),
  incrementVideoCount: () =>
    set((state) => ({
      profile: { ...state.profile, videoCount: state.profile.videoCount + 1 },
    })),
}));

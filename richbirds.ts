export interface UserProfile {
  username: string;
  totalBalance: number;
  taskCount: number;
  referralCount: number;
  videoCount: number;
  referralLink: string;
}

export interface EarningSource {
  type: 'task' | 'referral' | 'video';
  count: number;
  earnings: number;
}

export type TabType = 'home' | 'referral' | 'center' | 'video' | 'cash';

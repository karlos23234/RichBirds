import { RBHeader } from '../components/RichBirds/RBHeader';
import { RBBottomNav } from '../components/RichBirds/RBBottomNav';
import { RBEarningsCard } from '../components/RichBirds/RBEarningsCard';
import { RBQuickStats } from '../components/RichBirds/RBQuickStats';
import { RBUserProfileCard } from '../components/RichBirds/RBUserProfileCard';
import { RBReferralCard } from '../components/RichBirds/RBReferralCard';
import { RBActionCards } from '../components/RichBirds/RBActionCards';
import { RBBonusInfo } from '../components/RichBirds/RBBonusInfo';

export const RichBirdsHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RBHeader />

      <main className="px-4 py-4 space-y-4">
        <RBEarningsCard />
        <RBUserProfileCard />
        <RBQuickStats />
        <RBReferralCard />
        <RBActionCards />
        <RBBonusInfo />
      </main>

      <RBBottomNav />
    </div>
  );
};

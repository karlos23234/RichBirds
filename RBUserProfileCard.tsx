import { useUserStore } from '../../store/useUserStore';

export const RBUserProfileCard = () => {
  const { profile } = useUserStore();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg transition-all duration-300 active:scale-98">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Օգտատերի տվյալներ</h3>
      <p className="text-sm text-gray-700">
        Օգտատեր: <strong>{profile.username}</strong>
      </p>
      <p className="text-sm text-gray-700">
        Ընդհանուր մնացորդ: <strong>֏{profile.totalBalance.toLocaleString()}</strong>
      </p>
      <p className="text-sm text-gray-700">
        Առաջադրանքներ: <strong>{profile.taskCount}</strong> (֏2,000)
      </p>
      <p className="text-sm text-gray-700">
        Հրավերներ: <strong>{profile.referralCount}</strong> (֏4,000 + 10%)
      </p>
      <p className="text-sm text-gray-700">
        Տեսանյութեր: <strong>{profile.videoCount}</strong> (֏2,300)
      </p>
      <p className="text-sm text-gray-700 break-all">
        Հղում: <strong>{profile.referralLink}</strong>
      </p>
    </div>
  );
};

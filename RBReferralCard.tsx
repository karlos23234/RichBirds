import { useState } from 'react';
import { useUserStore } from '../../store/useUserStore';

export const RBReferralCard = () => {
  const { profile } = useUserStore();
  const [showToast, setShowToast] = useState(false);

  const copyReferralLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.referralLink);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-lg transition-all duration-300 active:scale-98">
        <h3 className="font-semibold text-gray-800 mb-3">Ձեր հրավերի հղումը</h3>
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="text-xs text-gray-600 break-all">{profile.referralLink}</div>
        </div>
        <button
          onClick={copyReferralLink}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          📋 Կիսվել հղումով
        </button>
      </div>

      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-center">
          Հղումը պատճենվել է! 📋
        </div>
      )}
    </>
  );
};

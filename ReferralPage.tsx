import { useState } from 'react';
import { RBHeader } from '../components/RichBirds/RBHeader';
import { RBBottomNav } from '../components/RichBirds/RBBottomNav';
import { useUserStore } from '../store/useUserStore';

export const ReferralPage = () => {
  const { profile } = useUserStore();
  const [showToast, setShowToast] = useState(false);

  const copyReferralLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.referralLink);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const mockReferrals = [
    { username: '@user1234', earnings: 4000, date: '2025-10-20' },
    { username: '@user5678', earnings: 4000, date: '2025-10-19' },
    { username: '@user9012', earnings: 4000, date: '2025-10-18' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RBHeader />

      <main className="px-4 py-4 space-y-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-lg font-semibold opacity-90">Հրավերների վիճակագրություն</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm opacity-80">Ընդհանուր հրավերներ</p>
                <p className="text-2xl font-bold">{profile.referralCount}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Ընդհանուր եկամուտ</p>
                <p className="text-2xl font-bold">֏{profile.referralCount * 4000}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-xl mr-2">🔗</span>
            Ձեր հրավերի հղումը
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-600 break-all">{profile.referralLink}</div>
          </div>
          <button
            onClick={copyReferralLink}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            📋 Կիսվել հղումով
          </button>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Ինչպես է աշխատում</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Կիսվեք հղումով</p>
                <p className="text-xs text-gray-600">Ուղարկեք ձեր հղումը ընկերներին</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Ընկերները միանում են</p>
                <p className="text-xs text-gray-600">Նրանք գրանցվում են ձեր հղումով</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Ստացեք պարգևներ</p>
                <p className="text-xs text-gray-600">Վաստակեք ֏4,000 + 10% նրանց եկամտից</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Ձեր հրավերները</h3>
          {mockReferrals.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-gray-600 text-sm">Դեռ հրավերներ չկան</p>
              <p className="text-gray-500 text-xs mt-1">Սկսեք կիսվել ձեր հղումով</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockReferrals.map((referral, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{referral.username}</p>
                      <p className="text-xs text-gray-500">{referral.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+֏{referral.earnings}</p>
                    <p className="text-xs text-gray-500">Բոնուս</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bonus Info */}
        <div className="bg-gradient-to-r from-purple-100 to-green-100 rounded-2xl p-4 border border-green-200">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">💎</span>
            <h3 className="font-bold text-purple-800">Հատուկ բոնուսներ</h3>
          </div>
          <ul className="space-y-1 text-sm text-purple-700">
            <li>• Հրավիրեք 5 ընկերներ՝ ստացեք +֏2,000</li>
            <li>• Հրավիրեք 10 ընկերներ՝ ստացեք +֏5,000</li>
            <li>• Հրավիրեք 20 ընկերներ՝ ստացեք +֏15,000</li>
          </ul>
        </div>
      </main>

      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-center">
          Հղումը պատճենվել է! 📋
        </div>
      )}

      <RBBottomNav />
    </div>
  );
};

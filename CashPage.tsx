import { useState } from 'react';
import { RBHeader } from '../components/RichBirds/RBHeader';
import { RBBottomNav } from '../components/RichBirds/RBBottomNav';
import { useUserStore } from '../store/useUserStore';

interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  minAmount: number;
  processingTime: string;
  fee: number;
}

export const CashPage = () => {
  const { profile } = useUserStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  
  const CRYPTO_ADDRESS = 'Xg1ZHSPT1wBY3Y11cEJY6KTQQMYPs1we1p';

  const copyCryptoAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CRYPTO_ADDRESS);
    }
    setToastMessage('Կրիպտո հասցեն պատճենվել է! 📋');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const withdrawalMethods: WithdrawalMethod[] = [
    {
      id: 'bank',
      name: 'Բանկային քարտ',
      icon: '💳',
      minAmount: 2500,
      processingTime: '1-3 օր',
      fee: 0,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '💰',
      minAmount: 2500,
      processingTime: '24 ժամ',
      fee: 2,
    },
    {
      id: 'crypto',
      name: 'Կրիպտո',
      icon: '₿',
      minAmount: 2500,
      processingTime: '1-2 ժամ',
      fee: 1,
    },
    {
      id: 'mobile',
      name: 'Բջջային վճարում',
      icon: '📱',
      minAmount: 2500,
      processingTime: 'Ակնթարթային',
      fee: 3,
    },
  ];

  const handleWithdraw = () => {
    if (!selectedMethod) {
      setToastMessage('Խնդրում ենք ընտրել վճարման եղանակ');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const withdrawAmount = parseInt(amount);
    const method = withdrawalMethods.find((m) => m.id === selectedMethod);

    if (!method) return;

    if (!withdrawAmount || withdrawAmount < method.minAmount) {
      setToastMessage(`Նվազագույն գումարը ${method.minAmount} դրամ է`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    if (withdrawAmount > profile.totalBalance) {
      setToastMessage('Անբավարար մնացորդ');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    setToastMessage('Ձեր հայտը ուղարկված է մշակման! ✅');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setAmount('');
    setSelectedMethod(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RBHeader />

      <main className="px-4 py-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-lg font-semibold opacity-90">Հասանելի մնացորդ</h2>
            <p className="text-4xl font-bold mt-2">֏{profile.totalBalance.toLocaleString()}</p>
            <p className="text-sm opacity-80 mt-2">Նվազագույն լիցքավորում՝ ֏2,500</p>
          </div>
        </div>

        {/* Withdrawal Amount */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Լիցքավորման գումար</h3>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Մուտքագրեք գումարը"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              ֏
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[2500, 5000, 10000, 20000].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-100 hover:text-purple-600 transition-colors"
              >
                ֏{preset >= 1000 ? preset / 1000 + 'K' : preset}
              </button>
            ))}
          </div>
        </div>

        {/* Withdrawal Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Ընտրեք եղանակը</h3>
          <div className="space-y-3">
            {withdrawalMethods.map((method) => (
              <div key={method.id}>
                <button
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{method.icon}</div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{method.name}</p>
                        <p className="text-xs text-gray-600">
                          Նվազագույն ֏{method.minAmount} • {method.processingTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {method.fee === 0 ? (
                        <span className="text-xs font-semibold text-green-600">Անվճար</span>
                      ) : (
                        <span className="text-xs text-gray-600">{method.fee}% վճար</span>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Crypto Address Field */}
                {selectedMethod === 'crypto' && method.id === 'crypto' && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">₿</span>
                      <h4 className="font-semibold text-gray-800 text-sm">Կրիպտո հասցե</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Փոխանցեք գումարը հետևյալ հասցեին՝</p>
                    <div className="bg-white rounded-lg p-3 mb-3 border border-orange-200">
                      <div className="text-xs text-gray-800 break-all font-mono">{CRYPTO_ADDRESS}</div>
                    </div>
                    <button
                      onClick={copyCryptoAddress}
                      className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
                    >
                      📋 Պատճենել հասցեն
                    </button>
                    <p className="text-xs text-orange-700 mt-2 text-center">
                      ⚠️ Փոխանցումից հետո սպասեք հաստատմանը
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
        >
          💸 Լիցքավորել հաշիվը
        </button>

        {/* Withdrawal History */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Լիցքավորումների պատմություն</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-600 text-sm">Դեռ լիցքավորումներ չկան</p>
            <p className="text-gray-500 text-xs mt-1">Ձեր լիցքավորումները կցուցադրվեն այստեղ</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">ℹ️</span>
            <h3 className="font-bold text-blue-800">Կարևոր տեղեկություն</h3>
          </div>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Լիցքավորումները մշակվում են 24/7</li>
            <li>• Նվազագույն գումարը ֏2,500 բոլոր եղանակների համար</li>
            <li>• Համոզվեք, որ ճիշտ եք մուտքագրել տվյալները</li>
          </ul>
        </div>
      </main>

      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-center">
          {toastMessage}
        </div>
      )}

      <RBBottomNav />
    </div>
  );
};

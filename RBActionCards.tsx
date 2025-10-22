import { useState } from 'react';

interface ActionItem {
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  reward: string;
  rewardColor: string;
  action: string;
}

export const RBActionCards = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const actions: ActionItem[] = [
    {
      icon: '📱',
      bgColor: 'bg-blue-100',
      title: 'Առաջադրանքներ',
      description: 'Փորձարկեք հավելվածներ և խաղեր',
      reward: 'Մինչև ֏2,000',
      rewardColor: 'text-purple-600',
      action: 'Բացվում են առաջադրանքները... 📱',
    },
    {
      icon: '👥',
      bgColor: 'bg-green-100',
      title: 'Հրավիրեք ընկերներին',
      description: 'Ստացեք բոնուս յուրաքանչյուր հրավերի համար',
      reward: '֏4,000 + 10%',
      rewardColor: 'text-green-600',
      action: 'Բացվում է հրավերների բաժինը... 👥',
    },
    {
      icon: '📺',
      bgColor: 'bg-red-100',
      title: 'Դիտեք տեսանյութեր',
      description: 'Վաստակեք գումար տեսանյութեր դիտելիս',
      reward: '֏2,300',
      rewardColor: 'text-red-600',
      action: 'Բացվում են տեսանյութերը... 📺',
    },
    {
      icon: '🎯',
      bgColor: 'bg-yellow-100',
      title: 'Ամենօրյա նպատակներ',
      description: 'Կատարեք ամենօրյա առաջադրանքները',
      reward: 'Բոնուս պարգևներ',
      rewardColor: 'text-yellow-600',
      action: 'Բացվում են ամենօրյա նպատակները... 🎯',
    },
  ];

  return (
    <>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800">Գումար վաստակելու եղանակներ</h3>
        {actions.map((item) => (
          <div
            key={item.title}
            onClick={() => showMessage(item.action)}
            className="bg-white rounded-xl p-4 shadow-lg transition-all duration-300 active:scale-98 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className={`text-sm ${item.rewardColor} font-semibold`}>{item.reward}</p>
              </div>
              <div className="text-gray-400">›</div>
            </div>
          </div>
        ))}
      </div>

      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-center">
          {toastMessage}
        </div>
      )}
    </>
  );
};

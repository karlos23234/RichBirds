import { useState } from 'react';
import { RBHeader } from '../components/RichBirds/RBHeader';
import { RBBottomNav } from '../components/RichBirds/RBBottomNav';
import { useUserStore } from '../store/useUserStore';

interface Video {
  id: number;
  title: string;
  duration: string;
  reward: number;
  thumbnail: string;
  watched: boolean;
}

export const VideoPage = () => {
  const { updateBalance, incrementVideoCount } = useUserStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: 'Ինչպես վաստակել առցանց',
      duration: '2:30',
      reward: 50,
      thumbnail: '🎬',
      watched: false,
    },
    {
      id: 2,
      title: 'Լավագույն գումար վաստակելու մեթոդներ',
      duration: '3:15',
      reward: 75,
      thumbnail: '📹',
      watched: false,
    },
    {
      id: 3,
      title: 'RichBirds ձեռնարկ սկսնակների համար',
      duration: '1:45',
      reward: 40,
      thumbnail: '🎥',
      watched: false,
    },
    {
      id: 4,
      title: 'Ամենաձեռնտու առաջադրանքները',
      duration: '2:00',
      reward: 60,
      thumbnail: '🎞️',
      watched: false,
    },
    {
      id: 5,
      title: 'Հատուկ բոնուսներ և պարգևներ',
      duration: '1:30',
      reward: 45,
      thumbnail: '📺',
      watched: false,
    },
  ]);

  const watchVideo = (videoId: number, reward: number) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId ? { ...video, watched: true } : video
      )
    );
    updateBalance(reward);
    incrementVideoCount();
    setToastMessage(`Շնորհակալություն դիտելու համար! +֏${reward} 🎉`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const totalEarnings = videos
    .filter((v) => v.watched)
    .reduce((sum, v) => sum + v.reward, 0);
  const availableEarnings = videos
    .filter((v) => !v.watched)
    .reduce((sum, v) => sum + v.reward, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RBHeader />

      <main className="px-4 py-4 space-y-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-red-600 to-pink-700 text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold opacity-90">Տեսանյութերի վիճակագրություն</h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <p className="text-xs opacity-80">Դիտված</p>
              <p className="text-xl font-bold">{videos.filter((v) => v.watched).length}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Վաստակած</p>
              <p className="text-xl font-bold">֏{totalEarnings}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Հասանելի</p>
              <p className="text-xl font-bold">֏{availableEarnings}</p>
            </div>
          </div>
        </div>

        {/* Daily Bonus */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                🎁
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ամենօրյա բոնուս</h3>
                <p className="text-xs text-gray-600">Դիտեք 5 տեսանյութ</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-red-600">+֏100</p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < videos.filter((v) => v.watched).length
                        ? 'bg-red-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Videos List */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">Հասանելի տեսանյութեր</h3>
          {videos.map((video) => (
            <div
              key={video.id}
              className={`bg-white rounded-xl p-4 shadow-lg transition-all ${
                video.watched ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {video.thumbnail}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{video.title}</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-600">⏱️ {video.duration}</span>
                    <span className="text-xs font-bold text-red-600">+֏{video.reward}</span>
                  </div>
                </div>
                {video.watched ? (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl text-green-600">✓</span>
                    <span className="text-xs text-green-600 font-semibold">Դիտված</span>
                  </div>
                ) : (
                  <button
                    onClick={() => watchVideo(video.id, video.reward)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    ▶️ Դիտել
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-4 border border-pink-200">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">🌟</span>
            <h3 className="font-bold text-pink-800">Բոնուս հնարավորություններ</h3>
          </div>
          <ul className="space-y-1 text-sm text-pink-700">
            <li>• Դիտեք տեսանյութը մինչև վերջ</li>
            <li>• Ամեն օր նոր տեսանյութեր են ավելանում</li>
            <li>• Բարձր պարգև երկար տեսանյութերի համար</li>
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

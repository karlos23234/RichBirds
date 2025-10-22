import { useUserStore } from '../../store/useUserStore';

export const RBHeader = () => {
  const { profile } = useUserStore();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 shadow-lg sticky top-0 z-30">
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">R</span>
          </div>
          <h1 className="text-xl font-bold">RichBirds</h1>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-90">{profile.username}</div>
          <div className="text-lg font-bold">֏{profile.totalBalance.toLocaleString()}</div>
        </div>
      </div>
    </header>
  );
};

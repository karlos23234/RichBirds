import { useUserStore } from '../../store/useUserStore';

export const RBEarningsCard = () => {
  const { profile } = useUserStore();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-6 relative overflow-hidden transition-all duration-300 active:scale-98">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold opacity-90">Ընդհանուր մնացորդ</h2>
          <p className="text-3xl font-bold">֏{profile.totalBalance.toLocaleString()}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">💰</span>
        </div>
      </div>
    </div>
  );
};

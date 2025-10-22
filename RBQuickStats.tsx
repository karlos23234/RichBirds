import { useUserStore } from '../../store/useUserStore';

export const RBQuickStats = () => {
  const { profile } = useUserStore();

  const stats = [
    {
      icon: '📋',
      count: profile.taskCount,
      label: 'Առաջադրանք',
      earnings: '֏2,000',
      bgClass: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    },
    {
      icon: '👥',
      count: profile.referralCount,
      label: 'Հրավեր',
      earnings: '֏4,000',
      bgClass: 'bg-gradient-to-br from-red-600 to-orange-600',
    },
    {
      icon: '📺',
      count: profile.videoCount,
      label: 'Տեսանյութ',
      earnings: '֏2,300',
      bgClass: 'bg-gradient-to-br from-amber-800 to-yellow-700',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bgClass} text-white rounded-xl p-4 text-center transition-all duration-300 active:scale-95`}
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-lg font-bold">{stat.count}</div>
          <div className="text-xs opacity-90">{stat.label}</div>
          <div className="text-xs opacity-75">{stat.earnings}</div>
        </div>
      ))}
    </div>
  );
};

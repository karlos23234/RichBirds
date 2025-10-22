import { useNavigate, useLocation } from 'react-router-dom';
import { TabType } from '../../types/richbirds';

export const RBBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = (): TabType => {
    const path = location.pathname;
    if (path === '/referral') return 'referral';
    if (path === '/center') return 'center';
    if (path === '/video') return 'video';
    if (path === '/cash') return 'cash';
    return 'home';
  };

  const handleTabClick = (tab: TabType) => {
    const routes: Record<TabType, string> = {
      home: '/',
      referral: '/referral',
      center: '/center',
      video: '/video',
      cash: '/cash',
    };
    navigate(routes[tab]);
  };

  const activeTab = getActiveTab();

  const navItems: Array<{ id: TabType; icon: string; label: string }> = [
    { id: 'home', icon: '🏠', label: 'Գլխավոր' },
    { id: 'referral', icon: '👥', label: 'Հրավեր' },
    { id: 'center', icon: '📋', label: 'Կենտրոն' },
    { id: 'video', icon: '📺', label: 'Տեսանյութ' },
    { id: 'cash', icon: '💵', label: 'Կանխիկ' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center py-2 transition-all duration-200 ${
              activeTab === item.id ? 'text-purple-600 scale-110' : 'text-gray-600'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

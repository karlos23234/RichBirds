import { useState } from 'react';
import { RBHeader } from '../components/RichBirds/RBHeader';
import { RBBottomNav } from '../components/RichBirds/RBBottomNav';
import { useUserStore } from '../store/useUserStore';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  icon: string;
  completed: boolean;
  category: 'app' | 'game' | 'survey' | 'social';
}

export const CenterPage = () => {
  const { updateBalance, incrementTaskCount } = useUserStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Տեղադրեք Shopping App',
      description: 'Ներբեռնեք և գրանցվեք',
      reward: 500,
      icon: '🛍️',
      completed: false,
      category: 'app',
    },
    {
      id: 2,
      title: 'Խաղացեք Puzzle Game',
      description: 'Հասեք 5-րդ մակարդակին',
      reward: 800,
      icon: '🎮',
      completed: false,
      category: 'game',
    },
    {
      id: 3,
      title: 'Լրացրեք հարցում',
      description: 'Պատասխանեք 10 հարցերի',
      reward: 300,
      icon: '📝',
      completed: false,
      category: 'survey',
    },
    {
      id: 4,
      title: 'Հետևեք Instagram-ում',
      description: 'Հետևեք մեր էջին',
      reward: 200,
      icon: '📱',
      completed: false,
      category: 'social',
    },
    {
      id: 5,
      title: 'Դիտեք ռեկլամային տեսանյութ',
      description: 'Դիտեք 30 վայրկյան',
      reward: 100,
      icon: '📺',
      completed: false,
      category: 'app',
    },
  ]);

  const completeTask = (taskId: number, reward: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    updateBalance(reward);
    incrementTaskCount();
    setToastMessage(`+֏${reward} ավելացվել է ձեր հաշվին! 🎉`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const categoryIcons: Record<string, string> = {
    app: '📱',
    game: '🎮',
    survey: '📝',
    social: '👥',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RBHeader />

      <main className="px-4 py-4 space-y-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold opacity-90">Առաջադրանքների կենտրոն</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm opacity-80">Կատարված</p>
              <p className="text-2xl font-bold">
                {tasks.filter((t) => t.completed).length}/{tasks.length}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">Հասանելի պարգև</p>
              <p className="text-2xl font-bold">
                ֏{tasks.filter((t) => !t.completed).reduce((sum, t) => sum + t.reward, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(categoryIcons).map(([category, icon]) => (
            <button
              key={category}
              className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs text-gray-600 capitalize">{category}</div>
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">Հասանելի առաջադրանքներ</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 shadow-lg transition-all ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    {task.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-600">{task.description}</p>
                    <p className="text-sm font-bold text-blue-600 mt-1">+֏{task.reward}</p>
                  </div>
                </div>
                {task.completed ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="text-xl">✓</span>
                    <span className="text-xs font-semibold">Կատարված</span>
                  </div>
                ) : (
                  <button
                    onClick={() => completeTask(task.id, task.reward)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Սկսել
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 border border-yellow-200">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-orange-800">Խորհուրդներ</h3>
          </div>
          <ul className="space-y-1 text-sm text-orange-700">
            <li>• Ամեն օր ստուգեք նոր առաջադրանքները</li>
            <li>• Կատարեք բոլոր առաջադրանքները բոնուսի համար</li>
            <li>• Բարձր պարգևով առաջադրանքներից սկսեք</li>
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

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RichBirdsHome } from './pages/RichBirdsHome';
import { ReferralPage } from './pages/ReferralPage';
import { CenterPage } from './pages/CenterPage';
import { VideoPage } from './pages/VideoPage';
import { CashPage } from './pages/CashPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RichBirdsHome />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/center" element={<CenterPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/cash" element={<CashPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

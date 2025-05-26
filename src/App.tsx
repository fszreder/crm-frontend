import { Routes, Route } from 'react-router-dom';
import { HomePage } from './homepage';
import ClientsPage from '@/pages/ClientsPage';

function App() {
  return (
    <div className="p-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </div>
  );
}

export default App;
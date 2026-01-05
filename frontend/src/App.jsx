import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import TeamsOverview from './pages/TeamsOverview';
import TeamDetails from './pages/TeamDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TeamsOverview />} />
          <Route path="teams/:id" element={<TeamDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPage from './components/NewPage';
import Header from './components/Header';
import YogaJournal from './components/YogaJournal';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<YogaJournal />} />
          <Route path="/NewPage" element={<NewPage />} />
        </Routes>
      </main>
    </Router>
  );
}
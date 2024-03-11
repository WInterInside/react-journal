import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPage from './components/NewPage';
import NewLargePage from './components/NewLargePage';
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
		  <Route path="/NewLargePage" element={<NewLargePage />} />
        </Routes>
      </main>
    </Router>
  );
}
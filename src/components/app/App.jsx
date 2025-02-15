import '../app/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from '/src/pages/Board';
import BoardPage from '/src/pages/BoardPage';
import Header from '../header/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/board/:id" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
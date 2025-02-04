import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './Board';
import BoardPage from './BoardPage';
import Header from './Header';

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
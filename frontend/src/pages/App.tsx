import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import MyCVs from './MyCVs';
import Editor from './Editor';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-cvs" element={<MyCVs />} />
                <Route path="/editor/new" element={<Editor />} />
                <Route path="/editor/:id" element={<Editor />} />
            </Routes>
        </Router>
    );
}

export default App;

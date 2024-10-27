import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Signup from './Signup';
import Login from './Login';
import Translate from "./Translate";
import TranslationHistory from "./TranslationHistory";

function App() {
    const [user, setUser] = useState(null);
    console.log(user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route
                    path="/" element={<Translate user={user} />} />
                <Route
                    path="/history"
                    element={user ? <TranslationHistory user={user} /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
        r.json().then((user) => setUser(user));
        }
      })
  }, []);

  if (!user) return <Login onLogin={setUser} />

  return (
    <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <div>
          <Routes>
            <Route path="/" element={<h1>myData [Collector]</h1>} />
            <Route path="/students" element={<h1>myData [Collector]</h1>} />
            <Route path="/students/new" element={<h1>myData [Collector]</h1>} />
            <Route path="/goals/new" element={<h1>myData [Collector]</h1>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
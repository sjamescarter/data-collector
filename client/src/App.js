import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";

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
        <div className="App">
          <Routes>
            <Route path="/" element={<h1>myDATAcollector</h1>} />
            <Route path="/signup" element={<Signup onLogin={setUser}/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
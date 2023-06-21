import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import StudentList from "./pages/StudentList";
import NewStudent from "./pages/NewStudent";

function App() {
  const [user, setUser] = useState("");
  const [students, setStudents] = useState([]);
console.log(students)
  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
        r.json().then((user) => setUser(user));
        }
      })
      fetch('/students')
      .then(r => r.json())
      .then(data => setStudents(data))
  }, []);

  if (!user) return <Login onLogin={setUser} />

  return (
    <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <div style={{marginLeft: "12.5em"}}>
          <Routes>
            <Route path="/" element={<StudentList user={user} students={students} />} />
            {/* <Route path="/students" element={<StudentList user={user} />} /> */}
            <Route path="/students/new" element={<NewStudent user={user} students={students} setStudents={setStudents} />} />
            <Route path="/goals/new" element={<h1>New Goal</h1>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
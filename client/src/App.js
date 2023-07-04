import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyStudents from "./pages/MyStudents";
import NavBar from "./components/NavBar";
import NewGoal from "./pages/NewGoal";
import NewStudent from "./pages/NewStudent";
import Student from "./pages/Student"

function App() {
  const [user, setUser] = useState();
  const [students, setStudents] = useState();

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => handleLogin(user));
      }
    })
    // fetch(fetcher)
    // .then((r) => {
    //   if (r.ok) {
    //     r.json().then((students) => setStudents(students));
    //   }
    // })
  }, []);

  function handleLogin(user) {
    setUser({ 
      id: user.id, 
      firstName: user.first_name, 
      lastName: user.last_name, 
      jobTitle: user.job_title 
    });
    setStudents(user.students);
  }

  if (!user) return <Login onLogin={handleLogin} />
console.log(user)
console.log(students)
  return (
    <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <div style={{marginLeft: "12.5em"}}>
          <Routes>
            <Route path="/" element={<Dashboard students={students} setStudents={setStudents} />} />
            <Route path="/students" element={<MyStudents user={user} students={students} setStudents={setStudents} />} />
            <Route path="/students/:id" element={<Student user={user} students={students} setStudents={setStudents} />} />
            <Route path="/students/:id/goals/new" element={<NewGoal students={students} setStudents={setStudents} />} />
            <Route path="/students/new" element={<NewStudent students={students} setStudents={setStudents} />} />
            <Route path="/students/new/:name" element={<NewStudent students={students} setStudents={setStudents} />} />
            <Route path="/goals/new" element={<NewGoal students={students} setStudents={setStudents} />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
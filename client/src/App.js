import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./context/user";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyStudents from "./pages/MyStudents";
import NavBar from "./components/NavBar";
import NewGoal from "./pages/NewGoal";
import NewStudent from "./pages/NewStudent";
import Student from "./pages/Student"

function App() {
  const { user, setUser, setStudents } = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => handleLogin(user));
      }
    })
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

  return (
    <BrowserRouter>
        <NavBar />
        <div style={{marginLeft: "12.5em"}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<MyStudents />} />
            <Route path="/students/:id" element={<Student />} />
            <Route path="/students/new" element={<NewStudent />}>
              <Route path=":name" element={<NewStudent />} />
            </Route>
            <Route path="/goals/new" element={<NewGoal />}>
              <Route path="students/:id" element={<NewGoal />} />
            </Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
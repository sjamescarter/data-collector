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
import { get } from "./components/fetch";
import Goal from "./pages/Goal";

function App() {
  const { user, setUser, students, setStudents } = useContext(UserContext);

  const loadApp = () => {
    get('/me', setUser);
    get('/students', setStudents);
  }
console.log(user)
console.log(students)
  useEffect(loadApp, []);

  if (!user) return <Login onLogin={setUser} loadApp={loadApp}/>

  return (
    <BrowserRouter>
        <NavBar />
        <div style={{marginLeft: "12.5em"}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<MyStudents />} />
            <Route path="/students/:studentId" element={<Student />}>
              <Route path="goals/:goalId" element={<Goal />} />
            </Route>
            <Route path="/goals/:id" element={<Goal />} />
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
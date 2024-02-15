import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./context/user";
import { get } from "./components/fetch";
import Dashboard from "./pages/Dashboard";
import Goal from "./components/Goal";
import Login from "./pages/Login";
import MyStudents from "./pages/MyStudents";
import NavBar from "./components/NavBar";
import NewStudent from "./pages/NewStudent";
import Student from "./pages/Student"

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
            {/* <Route path="/school" element={<Students />} /> */}
            <Route path="/students" element={<MyStudents />} />
            <Route path="/students/new" element={<NewStudent />} />
            <Route path="/students/:studentId" element={<Student />}>
              <Route path="goals/:goalId" element={<Goal />} />
            </Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
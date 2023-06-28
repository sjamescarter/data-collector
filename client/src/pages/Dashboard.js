import { useState } from "react";
import Search from "../components/Search";
import StudentList from "../components/StudentList";

function Dashboard({ students, setStudents }) {
    const [search, setSearch] = useState("");
    const filtered = [...students].filter(r => r.name.toUpperCase().includes(search.toUpperCase()))

    return (
        <div>
            <h1>Dashboard</h1>
            {<Search search={search} setSearch={setSearch} />}
            {<StudentList students={filtered} setStudents={setStudents} />}
        </div>
    )
}

export default Dashboard;
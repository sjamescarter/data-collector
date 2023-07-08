import { createContext, useState } from "react";

const UserContext = createContext("");

function UserProvider({children}){
    const [user, setUser] = useState();
    const [students, setStudents] = useState();

    return (
        <UserContext.Provider value={{ user, setUser, students, setStudents }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
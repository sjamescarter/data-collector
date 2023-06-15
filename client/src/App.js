import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";

function App() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    // fetch("/hello")
    //   .then((r) => r.json())
    //   .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<h1>myDATAcollector</h1>} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
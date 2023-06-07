import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);
console.log(count.count)
  return (
    <div className="App">
      <h1>Page Count: {count.count}</h1>
    </div>
  );
}

export default App;
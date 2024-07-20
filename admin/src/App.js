import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import LeftSiderbar from "./components/LeftSiderbar";

function App() {
  return (
    <div className="App">
      <Header />
      <LeftSiderbar />
      <main id="main" className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Books from "./pages/Books";
import Update from "./pages/Update";
import Add from "./pages/Add";
import "./style.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={< Books />} />
          <Route exact path='/update' element={< Update />} />
          <Route exact path='/add' element={< Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


import HomePage from "./screens/HomePage";
// import Track from "./screens/Track";
import { BrowserRouter } from "react-router-dom";
import {Routes,Route} from 'react-router'
import Track from "./screens/Track";
function App() {
  return (
  <>
  <BrowserRouter>
      <Routes>
                <Route path="/" element={<HomePage/>} /> 
                <Route path="/track" element={<Track/>} /> 
      </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

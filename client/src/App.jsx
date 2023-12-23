//import Header from "./components/Header"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import { LiveVisitors } from "./components/LiveVisitors";



function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
       {/* <Route path="/" element={<Header/>} />  */}
        <Route path="/" element={<LiveVisitors/>} /> 
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

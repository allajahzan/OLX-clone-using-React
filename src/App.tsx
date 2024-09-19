import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/home"
import ItemDetails from "./pages/itemDetails/itemDetails"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<ItemDetails />} />
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CifradoCesarPages } from "./pages/cifladoCesarPages.jsx";
import { CifradoEscitala } from "./pages/cifladoEscitala.jsx";
import {CifradoTEA} from "./pages/cifladoTEA.jsx";
import {CifradoRSA} from "./pages/cifladoRSA.jsx";
import {CifradoWhirlpool} from "./pages/cifladoWhirlpool.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CifradoCesarPages />} />
        <Route path='/cifrado-escitala' element={<CifradoEscitala />} />
        <Route path='/cifrado-TEA' element={<CifradoTEA />} />
        <Route path='/cifrado-RSA' element={<CifradoRSA />} />
        <Route path='/cifrado-CifradoWhirlpool' element={<CifradoWhirlpool />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

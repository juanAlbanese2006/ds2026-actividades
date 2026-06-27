import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Catalogo from "./Pages/Catalogo";
import LibroDetalle from "./Pages/LibroDetalle";
import LibroNuevo from "./Pages/LibroNuevo"; // 👈 nuevo import

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
      </Routes>
    </Layout>
  );
}

export default App;

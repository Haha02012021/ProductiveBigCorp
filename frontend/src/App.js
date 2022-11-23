import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import LineManage from "./Pages/ExecutiveBoard/ProductLine/LinesManage";
import { ConfigProvider } from "antd";
import VersionManage from "./Pages/ExecutiveBoard/ProductLine/VersionManage";
import Product from "./Pages/ExecutiveBoard/Product";
import UnitManage from "./Pages/ExecutiveBoard/UnitManage";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#47B5FF",
          colorPrimaryBg: "white",
          fontFamily: "Roboto",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/product-line/lines-manage" element={<LineManage />} />
          <Route
            path="/product-line/version-manage"
            element={<VersionManage />}
          />
          <Route path="/product" element={<Product />} />
          <Route path="/units-manage" element={<UnitManage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

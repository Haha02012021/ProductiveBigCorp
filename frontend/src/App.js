import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import { ConfigProvider } from "antd";
import ExecutiveBoard from "./Pages/ExecutiveBoard";
import Store from "./Pages/Store";
import Factory from "./Pages/Factory";
import ExecutiveBoardLayout from "./Layouts/ExecutiveBoardLayout";
import UnitManage from "./Pages/ExecutiveBoard/UnitManage";
import LineManage from "./Pages/ExecutiveBoard/ProductLine/LinesManage";
import VersionManage from "./Pages/ExecutiveBoard/ProductLine/VersionManage";

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
          <Route path="executive-board/*" element={<ExecutiveBoard />} />
          <Route path="factory/*" element={<Factory />} />
          <Route path="store/*" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

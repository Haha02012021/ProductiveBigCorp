import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import { ConfigProvider } from "antd";
import ExecutiveBoard from "./Pages/ExecutiveBoard";
import Store from "./Pages/Store";
import Factory from "./Pages/Factory";
import AuthProvider from "./Provider/AuthProvider";
import ThemeProvider from "./Provider/ThemeProvider";
import locale from "antd/locale/vi_VN";

function App() {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#47B5FF",
          colorPrimaryBg: "white",
          fontFamily: "Roboto",
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="executive-board/*" element={<ExecutiveBoard />} />
              <Route path="factory/*" element={<Factory />} />
              <Route path="store/*" element={<Store />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;

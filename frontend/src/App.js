import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import LineManage from "./Pages/ExecutiveBoard/ProductLine/LinesManage";
import { ConfigProvider } from "antd";
import VersionManage from "./Pages/ExecutiveBoard/ProductLine/VersionManage";
import Product from "./Pages/ExecutiveBoard/Product";
import UnitManage from "./Pages/ExecutiveBoard/UnitManage";
import ProductLot from "./Pages/Factory/ProductLot";
import StoreProduct from "./Pages/Store/StoreProduct";
import ProductWarranty from "./Pages/Store/ProductWarranty";
import ProductImport from "./Pages/Factory/ProductImportExport/ProductImport";
import ProductExport from "./Pages/Factory/ProductImportExport/ProductExport";
import { default as FactoryReport } from "./Pages/Factory/Statistical/Report";
import { default as FactoryAnalysis } from "./Pages/Factory/Statistical/Analysis";
import ErrorRate from "./Pages/Factory/Statistical/ErrorRate";

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
          <Route path="/product-lot" element={<ProductLot />} />
          <Route
            path="/product-in-out/export-to-store"
            element={<ProductExport />}
          />
          <Route
            path="/product-in-out/receive-from-maitainence"
            element={<ProductImport />}
          />
          <Route path="/statistical/report" element={<FactoryReport />} />
          <Route path="/statistical/analysis" element={<FactoryAnalysis />} />
          <Route path="/statistical/error-rate" element={<ErrorRate />} />
          <Route path="/store-product" element={<StoreProduct />} />
          <Route path="/product-warranty" element={<ProductWarranty />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

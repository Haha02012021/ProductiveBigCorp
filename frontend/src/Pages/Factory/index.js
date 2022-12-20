import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductLot from "./ProductLot";
import ProductExport from "./ProductImportExport/ProductExport";
import ProductImport from "./ProductImportExport/ProductImport";
import Report from "./Statistical/Report";
import Analysis from "./Statistical/Analysis";
import ErrorRate from "./Statistical/ErrorRate";

const Factory = () => {
  return (
    <Routes>
      <Route path="/product-lot" element={<ProductLot />} />
      <Route
        path="/product-in-out/export-to-store"
        element={<ProductExport />}
      />
      <Route
        path="/product-in-out/receive-from-maitainence"
        element={<ProductImport />}
      />
      <Route path="/statistical/report" element={<Report />} />
      <Route path="/statistical/analysis" element={<Analysis />} />
      <Route path="/statistical/error-rate" element={<ErrorRate />} />
    </Routes>
  );
};

export default Factory;

import React from "react";
import { Route, Routes } from "react-router-dom";
import StoreProduct from "./StoreProduct";
import ProductWarranty from "./ProductWarranty";
import Report from "./Statistical/Report";
import Analysis from "./Statistical/Analysis";
import StoreLayout from "../../Layouts/StoreLayout";
const Store = () => {
  return (
    <Routes>
      <Route path="/*" element={<StoreLayout />}>
        <Route path="store-product" element={<StoreProduct />} />
        <Route path="product-warranty" element={<ProductWarranty />} />
        <Route path="statistical/report" element={<Report />} />
        <Route path="statistical/analysis" element={<Analysis />} />
      </Route>
    </Routes>
  );
};

export default Store;

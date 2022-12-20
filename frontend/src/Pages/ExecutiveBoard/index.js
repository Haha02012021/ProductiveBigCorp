import React from "react";
import { Route, Routes } from "react-router-dom";
import LineManage from "./ProductLine/LinesManage";
import VersionManage from "./ProductLine/VersionManage";
import Product from "./Product";
import UnitManage from "./UnitManage";

const Store = () => {
  return (
    <Routes>
      <Route path="/product-line/lines-manage" element={<LineManage />} />
      <Route path="/product-line/version-manage" element={<VersionManage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/units-manage" element={<UnitManage />} />
    </Routes>
  );
};

export default Store;

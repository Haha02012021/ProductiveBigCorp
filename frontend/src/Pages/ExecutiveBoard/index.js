import React from "react";
import { Route, Routes } from "react-router-dom";
import LineManage from "./ProductLine/LinesManage";
import VersionManage from "./ProductLine/VersionManage";
import Product from "./Product";
import UnitManage from "./UnitManage";
import ExecutiveBoardLayout from "../../Layouts/ExecutiveBoardLayout";
import Analysis from "./Statistical/Analysis";
import ErrorRate from "./Statistical/ErrorRate";

const ExecutiveBoard = () => {
  return (
    <Routes>
      <Route path="/" element={<ExecutiveBoardLayout />}>
        <Route path="units-manage" element={<UnitManage />} />
        <Route path="product-line/lines-manage" element={<LineManage />} />
        <Route path="product-line/version-manage" element={<VersionManage />} />
        <Route path="product" element={<Product />} />
        <Route path="statistical/analysis" element={<Analysis />} />
        <Route path="statistical/error" element={<ErrorRate />} />
      </Route>
    </Routes>
  );
};

export default ExecutiveBoard;

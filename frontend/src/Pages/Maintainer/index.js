import { Route, Routes } from "react-router-dom";
import MaintainerLayout from "../../Layouts/MaintainerLayout";
import MaintainProduct from "./MaintainProduct";
import Report from "./Statistical/Report";
import TransportProduct from "./TransportProduct";

export default function Maintainer() {
  return (
    <Routes>
      <Route path="/*" element={<MaintainerLayout />}>
        <Route path="maintain-products" element={<MaintainProduct />} />
        <Route path="transport-products" element={<TransportProduct />} />
        <Route path="statistical" element={<Report />} />
      </Route>
    </Routes>
  );
}

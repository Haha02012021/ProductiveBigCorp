import { Route, Routes } from "react-router-dom";
import MaintainerLayout from "../../Layouts/MaintainerLayout";
import MaintainProduct from "./MaintainProduct";

export default function Maintainer() {
  return (
    <Routes>
      <Route path="/*" element={<MaintainerLayout />}>
        <Route path="maintain-products" element={<MaintainProduct />} />
        <Route path="statistical" />
      </Route>
    </Routes>
  );
}

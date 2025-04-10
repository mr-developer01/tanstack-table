import React from "react";
import { Route, Routes } from "react-router";
import Landing from "../pages/Landing";
import TanstackTable from "../Table";
import TanstackTable2 from "../Table2";
import TanstackTable3 from "../Table3";
import TanstackTable4 from "../Table4";
import TanstackTable5 from "../Table5";
import TanstackTable6 from "../Table6";
import TanstackTable7 from "../Table7";
import TanstackTable8 from "../Table8";
import TanstackTable9 from "../Table9";

const Layout = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/table" element={<TanstackTable />} />
      <Route path="/table2" element={<TanstackTable2 />} />
      <Route path="/table3" element={<TanstackTable3 />} />
      <Route path="/table4" element={<TanstackTable4 />} />
      <Route path="/table5" element={<TanstackTable5 />} />
      <Route path="/table6" element={<TanstackTable6 />} />
      <Route path="/table7" element={<TanstackTable7 />} />
      <Route path="/table8" element={<TanstackTable8 />} />
      <Route path="/table9" element={<TanstackTable9 />} />
    </Routes>
  );
};

export default Layout;

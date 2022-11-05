import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import Accessories from './modules/accessories';
const MyAssets = React.lazy(() => import('./modules/myassets/index'));


class AppRouting extends React.Component {

  render() {
    return (
      <Routes>
        <Route index element={<Accessories />} />
        <Route path="*" element={<Accessories />} />
        <Route path="myassets" element={<Suspense fallback={<>...</>}><MyAssets /></Suspense>}  />
      </Routes>
    )
  }

}

export default AppRouting;
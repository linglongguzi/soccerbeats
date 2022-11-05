import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './modules/home/home';

const Accessories = React.lazy(() => import('./modules/accessories/index'));


class AppRouting extends React.Component {

  render() {
    return (
      <Routes>
        <Route index element={<Home />} />

        <Route path="accessories/*" element={<Suspense fallback={<>...</>}><Accessories /></Suspense>} />

        <Route path="*" element={<Home />} />

      </Routes>
    )
  }

}

export default AppRouting;
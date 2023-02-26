import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import type { Component } from "solid-js";

import { BaseLayout } from "./layouts/BaseLayout";
const LoginView = lazy(() => import("./views/Login"));
const DashboardView = lazy(() => import("./views/Dashboard"));

const App: Component = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path={"/"} component={LoginView} />
        <Route path={"/dashboard"} component={DashboardView} />
      </Routes>
    </BaseLayout>
  );
};

export default App;

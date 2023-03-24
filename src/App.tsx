import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import type { Component } from "solid-js";

import { BaseLayout } from "./layouts/BaseLayout";
const checkingForUser = lazy(() => import("./views/Login/CheckingForUser"));
const phonePasscodeForm = lazy(() => import("./views/Login/PhonePasscodeForm"));
const currentMemberVeryifyPhoneForm = lazy(
  () => import("./views/Login/CurrentUserForm")
);
const newMemberVerifyPhoneForm = lazy(
  () => import("./views/Login/NewUserForm")
);
const DashboardView = lazy(() => import("./views/Dashboard"));

const App: Component = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path={"/"} component={checkingForUser} />
        <Route path={"/login"} component={phonePasscodeForm} />
        <Route
          path={"/current-member"}
          component={currentMemberVeryifyPhoneForm}
        />
        <Route path={"/new-member"} component={newMemberVerifyPhoneForm} />
        <Route path={"/dashboard"} component={DashboardView} />
      </Routes>
    </BaseLayout>
  );
};

export default App;

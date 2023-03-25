import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import type { Component } from "solid-js";

import { BaseLayout } from "./layouts/BaseLayout";
const checkingForUser = lazy(() => import("./views/Login/CheckingForUser"));
const createNewUser = lazy(() => import("./views/Login/CreateNewUser"));
const phonePasscodeForm = lazy(() => import("./views/Login/PhonePasscodeForm"));
const currentMemberVeryifyPhoneForm = lazy(
  () => import("./views/Login/CurrentUserForm")
);
const newMemberVerifyPhoneForm = lazy(
  () => import("./views/Login/NewUserForm")
);
const dashboardView = lazy(() => import("./views/Dashboard"));
const errorCreateUser = lazy(() => import("./views/Errors/ErrorCreateUser"));

const App: Component = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path={"/"} component={checkingForUser} />
        <Route path={"/login"} component={phonePasscodeForm} />
        <Route path={"/enrolling"} component={createNewUser} />
        <Route
          path={"/current-member"}
          component={currentMemberVeryifyPhoneForm}
        />
        <Route path={"/new-member"} component={newMemberVerifyPhoneForm} />
        <Route path={"/dashboard"} component={dashboardView} />
        <Route path={"/error"}>
          <Route path={"/create-user"} component={errorCreateUser} />
        </Route>
      </Routes>
    </BaseLayout>
  );
};

export default App;

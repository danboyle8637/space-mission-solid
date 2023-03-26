import { createEffect, createMemo, createResource, children } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component, JSX, JSXElement } from "solid-js";

import { GlobalStyles } from "../styles/Global";
import { getUser, getTestEndpoint } from "../utils/networkFunctions";
import { updateUser } from "../../lib/userStore";
import { isAuthenticated } from "../../lib/loginStore";
import type { UserDoc } from "../types";
import type { GetUserResponse } from "../types/api";

interface LayoutProps {
  children: JSXElement;
}

const Container = styled("main")`
  position: relative;
  width: 100%;
  isolation: isolate;
`;

const Galaxy = styled("div")`
  position: fixed;
  top: var(--galaxy-top);
  left: var(--galaxy-left);
  right: var(--galaxy-right);
  bottom: var(--galaxy-bottom);
  background-color: var(--galaxy-color);
  width: var(--galaxy-size);
  height: var(--galaxy-size);
  filter: blur(100px);
  z-index: -1;
`;

export const BaseLayout: Component<LayoutProps> = (props) => {
  const child = children(() => props.children);

  const navigate = useNavigate();
  const location = useLocation();

  const [userData] = createResource(isAuthenticated, getUser);

  const [testData] = createResource(getTestEndpoint);

  createMemo(() => {
    if (testData.state === "ready") {
      console.log("Test Data: ", testData());
    }

    const pathname = location.pathname;

    const unprotectedRoutes = [
      "/enrolling",
      "/login",
      "/current-member",
      "/new-member",
      "/error/create-user",
      "/",
    ];

    const protectedRoutes = ["/dashboard"];

    const isProtectedRoute = protectedRoutes.includes(pathname);

    if (userData.error) {
      console.log("USER DATA ERRORING OUT FROM MIDDLEWARE");
    }

    if (userData.error && !isAuthenticated()) {
      console.log("Getting user is erroring out");
      const clearUser: UserDoc = {
        firstName: "",
        activeMission: null,
        finishedMissions: [],
        callsign: "",
        avatarUrl: "",
      };
      updateUser(clearUser);
      navigate("/");
    }

    if (userData.state === "ready" && isAuthenticated()) {
      const userDoc: UserDoc = {
        firstName: userData().firstName,
        activeMission: userData().activeMission,
        finishedMissions: userData().finishedMissions,
        callsign: userData().callsign,
        avatarUrl: userData().avatarUrl,
      };
      updateUser(userDoc);
      navigate("/dashboard");
    }
  });

  const galaxy1Styles = createMemo(
    () =>
      ({
        "--galaxy-top": 0,
        "--galaxy-left": 0,
        "--galaxy-right": "unset",
        "--galaxy-bottom": "unset",
        "--galaxy-color": "var(--accent-teal)",
        "--galaxy-size": "160px",
      } as JSX.CSSProperties)
  );

  const galaxy2Styles = createMemo(
    () =>
      ({
        "--galaxy-top": "unset",
        "--galaxy-left": "unset",
        "--galaxy-right": 0,
        "--galaxy-bottom": 0,
        "--galaxy-color": "var(--accent-pink)",
        "--galaxy-size": "120px",
      } as JSX.CSSProperties)
  );

  return (
    <>
      <GlobalStyles />
      <Container>
        {child()}
        <Galaxy style={galaxy1Styles()} />
        <Galaxy style={galaxy2Styles()} />
      </Container>
    </>
  );
};

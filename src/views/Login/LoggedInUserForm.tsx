import { createEffect, createMemo, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { ActionButton } from "../../components/buttons/ActionButton";
import { user } from "../../../lib/userStore";

const ViewContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 100%;
  max-width: 375px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;

const LoggedInUserForm: Component = () => {
  let loggedInUserForm: HTMLDivElement;

  return (
    <ViewContainer>
      <Container ref={loggedInUserForm!}>
        <SpaceMissionLogo />
      </Container>
    </ViewContainer>
  );
};

export default LoggedInUserForm;

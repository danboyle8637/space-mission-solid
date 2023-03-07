import { createSignal, onMount, createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { LoginForm } from "./LoginForm";
import { loginFormOnLoad } from "../../animations";

const Container = styled("div")`
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

export const EnterPhoneForm: Component = () => {
  const [showLoginForm, setShowLoginForm] = createSignal<boolean>(false);

  const toggleShowLoginForm = () => {
    setShowLoginForm((prevValue) => !prevValue);
  };

  let loginFormRef: HTMLDivElement;

  onMount(() => {
    toggleShowLoginForm();
  });

  createEffect(() => {
    if (showLoginForm()) {
      loginFormOnLoad(loginFormRef);
    }
  });

  return (
    <Container ref={loginFormRef!}>
      <SpaceMissionLogo />
      <LoginForm />
    </Container>
  );
};

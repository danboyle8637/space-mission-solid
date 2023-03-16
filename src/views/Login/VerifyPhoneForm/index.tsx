import { createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { CurrentUserForm } from "./CurrentUserForm";
import { NewUserForm } from "./NewUserForm";
import { userLoginData } from "../../../../lib/userStore";
import {
  showPhoneForm,
  showNewMemberPasscodeForm,
  showReturningMemberPasscodeForm,
  updateShowNewMemberPasscodeForm,
  updateShowReturningMemberPasscodeForm,
} from "../../../../lib/loginStore";
import { showLoginForm, hideLoginForm } from "../../../animations";

const Container = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;

export const VerifyPhoneForm: Component = () => {
  let validateFormRef: HTMLDivElement;

  createEffect(() => {
    if (
      !showPhoneForm() &&
      (showReturningMemberPasscodeForm() || showNewMemberPasscodeForm())
    ) {
      showLoginForm(validateFormRef);
    }
  });

  createEffect(() => {
    if (userLoginData().userCreated) {
      updateShowNewMemberPasscodeForm(true);
    }

    if (!userLoginData().userCreated) {
      updateShowReturningMemberPasscodeForm(true);
    }
  });

  return (
    <>
      {showPhoneForm() ? null : (
        <Container ref={validateFormRef!}>
          {showNewMemberPasscodeForm() ? <NewUserForm /> : null}
          {showReturningMemberPasscodeForm() ? <CurrentUserForm /> : null}
        </Container>
      )}
    </>
  );
};

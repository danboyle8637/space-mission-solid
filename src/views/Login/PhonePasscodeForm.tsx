import { createEffect, createMemo, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { LoginForm } from "./LoginForm";
import {
  toggleIsMakingNetworkRequest,
  showPhoneForm,
  phoneNumberValue,
  resetLoginForm,
  updateShowPhoneForm,
} from "../../../lib/loginStore";
import { userLoginData, updateUserLoginData } from "../../../lib/userStore";
import { showLoginForm, hideLoginForm } from "../../animations";
import { getErrorMessage, sanitizePhoneNumber } from "../../utils/helpers";
import { fetchSendPhoneCode } from "../../utils/networkFunctions";
import type {
  LoginEmailReqBody,
  LoginPhoneReqBody,
  UserLoginData,
} from "../../types/api";

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

const PhonePasscodeForm: Component = () => {
  let phoneFormRef: HTMLDivElement;

  const navigate = useNavigate();

  onMount(() => {
    if (showPhoneForm()) {
      showLoginForm(phoneFormRef);
    }
  });

  createMemo(() => {
    if (!showPhoneForm() && userLoginData().phoneId !== "") {
      hideLoginForm(phoneFormRef).finished.then(() => {
        console.log("Animation done looking to see if new or returning member");
        const isNewUser = userLoginData().userCreated;

        if (isNewUser) {
          navigate("/new-member");
          return;
        }

        navigate("/current-member");
        return;
      });
    }
  });

  const handleLoginForm = async (e: SubmitEvent) => {
    e.preventDefault();

    toggleIsMakingNetworkRequest();

    // const email = emailAddress().value;
    const phoneNumber = phoneNumberValue().value;

    // const emailBody: LoginEmailReqBody = {
    //   emailAddress: email,
    // };

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);

    const phoneBody: LoginPhoneReqBody = {
      phoneNumber: sanitizedPhoneNumber,
    };

    try {
      await fetchSendPhoneCode(phoneBody);
    } catch (error) {
      // Open modal and talk about the error
      console.log("Error from server: ", getErrorMessage(error));
      resetLoginForm();
    }
  };

  return (
    <ViewContainer>
      <Container ref={phoneFormRef!}>
        <SpaceMissionLogo />
        <LoginForm handleFormSubmit={handleLoginForm} />
      </Container>
    </ViewContainer>
  );
};

export default PhonePasscodeForm;

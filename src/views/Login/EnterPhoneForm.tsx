import { onMount, createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { LoginForm } from "./LoginForm";
import {
  isMakingNetworkRequest,
  toggleIsMakingNetworkRequest,
  isTextSent,
  toggleIsTextSent,
  showPhoneForm,
  emailAddress,
  emailAddressOptions,
  updateInputValue,
  updateInputOptions,
  phoneNumberValue,
  phoneNumberOptions,
  updatePhoneNumberValue,
  updatePhoneNumberOptions,
  resetLoginForm,
  updateShowPhoneForm,
  updateShowNewMemberPasscodeForm,
} from "../../../lib/loginStore";
import { showLoginForm, hideLoginForm } from "../../animations";
import type {
  LoginEmailReqBody,
  LoginPhoneReqBody,
  UserLoginData,
} from "../../types/api";

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

export const EnterPhoneForm: Component = () => {
  let phoneFormRef: HTMLDivElement;

  createEffect(() => {
    if (showPhoneForm()) {
      showLoginForm(phoneFormRef);
    }

    if (isTextSent()) {
      hideLoginForm(phoneFormRef);
    }
  });

  const handleLoginForm = async (e: SubmitEvent) => {
    e.preventDefault();

    toggleIsMakingNetworkRequest();

    const email = emailAddress().value;
    const phoneNumber = phoneNumberValue().value;

    // const emailBody: LoginEmailReqBody = {
    //   emailAddress: email,
    // };

    const phoneBody: LoginPhoneReqBody = {
      phoneNumber: phoneNumber,
    };

    const showVerifyForm = () => {
      setTimeout(() => {
        updateShowPhoneForm(false);
      }, 350);
    };

    // * 200 Text Sent
    setTimeout(() => {
      // Run animation and make form
      // updateShowNewMemberPasscodeForm(true);
      toggleIsMakingNetworkRequest(); // false
      toggleIsTextSent(); // true
      showVerifyForm();
    }, 1000);

    // setTimeout(() => {
    //   updateShowPhoneForm(false);
    // }, 1000);

    // Is status === 200... hide form first
    // On form hide complete... show the next form

    // try {
    //   const getCodeRes = await fetch("/auth/get-phone-code", {
    //     method: "POST",
    //     body: JSON.stringify(phoneBody),
    //   });

    //   if (getCodeRes.status !== 200) {
    //     throw new Error(
    //       "Activate error modal or drawer and acknowledge the error as you reset the form"
    //     );
    //   }

    //   const codeData: UserLoginData = await getCodeRes.json();
    //   const { phoneId, userCreated } = codeData;

    //   if (!phoneId || !userCreated) {
    //     throw new Error("No phoneId or userCreated data.");
    //   }

    //   // Make the phone form disappear and have the verification form come in.
    //   // Clear the phone field because it's job is done
    //   // resetLoginForm();
    //   // updateUserLoginData(phoneId, userCreated);
    //   // TODO - Toggle the verifty form... NEED STATE
    // } catch (error) {
    //   // Open modal and talk about the error
    //   console.log(getErrorMessage(error));
    //   resetLoginForm();
    // }
  };

  return (
    <>
      {showPhoneForm() ? (
        <Container ref={phoneFormRef!}>
          <SpaceMissionLogo />
          <LoginForm handleFormSubmit={handleLoginForm} />
        </Container>
      ) : null}
    </>
  );
};

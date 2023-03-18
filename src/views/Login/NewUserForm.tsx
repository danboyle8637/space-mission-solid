import { createEffect, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { CountdownTimer } from "../../components/timers/CountdownTimer";
import { PhonePasscodeInput } from "../../components/forms/PhonePasscodeInput";
import { TextInput } from "../../components/forms/TextInput";
import { FormButton } from "../../components/buttons/FormButton";
import { showLoginForm, hideLoginForm } from "../../animations";
import {
  phonePasscode,
  phonePasscodeValue,
  firstNameValue,
  firstNameOptions,
  emailAddress,
  emailAddressOptions,
  callSignValue,
  callSignOptions,
  updateInputValue,
  updateInputOptions,
  isMakingNetworkRequest,
  showNewMemberPasscodeForm,
  updateShowNewMemberPasscodeForm,
  toggleIsMakingNetworkRequest,
} from "../../../lib/loginStore";
import { userLoginData } from "../../../lib/userStore";
import { getErrorMessage } from "../../utils/helpers";
import { fetchAuthenticateNewMember } from "../../utils/networkFunctions";
import type { AuthenticateNewMemberBody } from "../../types/api";

const ViewContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled("div")`
  padding: 20px 20px 40px 20px;
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

const VerifyForm = styled("form")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
`;

const NewUserForm: Component = () => {
  let formRef: HTMLDivElement;

  const navigate = useNavigate();

  onMount(() => {
    showLoginForm(formRef);
  });

  createEffect(() => {
    if (!showNewMemberPasscodeForm()) {
      hideLoginForm(formRef).finished.then(() => {
        navigate("/dashboard");
      });
    }
  });

  const handleVerifyPhone = async (e: SubmitEvent) => {
    e.preventDefault();

    toggleIsMakingNetworkRequest();

    const authenticateBody: AuthenticateNewMemberBody = {
      code: phonePasscode(),
      phoneId: userLoginData().phoneId,
      firstName: firstNameValue().value,
      emailAddress: emailAddress().value,
      callSign: callSignValue().value,
    };

    try {
      await fetchAuthenticateNewMember(authenticateBody);
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  };

  const isFormValid = () =>
    firstNameValue().valid && emailAddress().valid && callSignValue().valid;

  return (
    <ViewContainer>
      <Container ref={formRef!}>
        <SpaceMissionLogo />
        <VerifyForm onSubmit={handleVerifyPhone}>
          <PhonePasscodeInput />
          <TextInput
            inputType="text"
            inputName="firstName"
            labelFor="firstName"
            labelName="First Name"
            labelInstructions=""
            labelError=""
            placeholder="Enter your first name..."
            value={firstNameValue().value}
            valid={firstNameValue().valid}
            initial={firstNameOptions().initial}
            touched={firstNameOptions().touched}
            updateInputValue={updateInputValue}
            updateInputOptions={updateInputOptions}
            isDisabled={isMakingNetworkRequest()}
          />
          <TextInput
            inputType="email"
            inputName="emailAddress"
            labelFor="emailAddress"
            labelName="Email Address"
            labelInstructions=""
            labelError=""
            placeholder="Enter your email address..."
            value={emailAddress().value}
            valid={emailAddress().valid}
            initial={emailAddressOptions().initial}
            touched={emailAddressOptions().touched}
            updateInputValue={updateInputValue}
            updateInputOptions={updateInputOptions}
            isDisabled={isMakingNetworkRequest()}
          />
          <TextInput
            inputType="text"
            inputName="callSign"
            labelFor="callSign"
            labelName="Call Sign"
            labelInstructions=""
            labelError=""
            placeholder="Enter your call sign..."
            value={callSignValue().value}
            valid={callSignValue().valid}
            initial={callSignOptions().initial}
            touched={callSignOptions().touched}
            updateInputValue={updateInputValue}
            updateInputOptions={updateInputOptions}
            isDisabled={isMakingNetworkRequest()}
          />
          <FormButton
            isValid={isFormValid()}
            isDisabled={isMakingNetworkRequest()}
          >
            {isMakingNetworkRequest() ? "Verifying Phone" : "Verify Phone"}
          </FormButton>
        </VerifyForm>
      </Container>
    </ViewContainer>
  );
};

export default NewUserForm;

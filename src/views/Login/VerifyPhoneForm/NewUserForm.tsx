import { createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../../components/images/SpaceMissionLogo";
import { CountdownTimer } from "../../../components/timers/CountdownTimer";
import { PhonePasscodeInput } from "../../../components/forms/PhonePasscodeInput";
import { TextInput } from "../../../components/forms/TextInput";
import { FormButton } from "../../../components/buttons/FormButton";
import { showLoginForm, hideLoginForm } from "../../../animations";
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
  showNewMemberPasscodeForm,
} from "../../../../lib/loginStore";

const Container = styled("form")`
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

export const NewUserForm: Component = () => {
  const handleVerifyPhone = (e: SubmitEvent) => {
    e.preventDefault();

    // TODO - Take data and hit authenticate endpoint
  };

  return (
    <Container>
      <SpaceMissionLogo />
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
      />
    </Container>
  );
};

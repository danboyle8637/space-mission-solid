import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { PhoneTextInput } from "../../components/forms/PhoneTextInput";
import { FormButton } from "../../components/buttons/FormButton";
import {
  emailAddress,
  emailAddressOptions,
  updateInputValue,
  updateInputOptions,
  phoneNumberValue,
  phoneNumberOptions,
  updatePhoneNumberValue,
  updatePhoneNumberOptions,
  resetLoginForm,
  isMakingNetworkRequest,
} from "../../../lib/loginStore";

interface FormProps {
  handleFormSubmit: (e: SubmitEvent) => void;
}

const FormContainer = styled("form")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 24px;
  justify-items: center;
  width: 320px;
`;

const ButtonContainer = styled("div")`
  width: 175px;
`;

export const LoginForm: Component<FormProps> = (props) => {
  return (
    <FormContainer onSubmit={props.handleFormSubmit}>
      {/* <TextInput
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
      /> */}
      <PhoneTextInput
        inputType="tel"
        inputName="phoneNumber"
        labelFor="phoneNumber"
        labelName="Phone Number"
        labelInstructions=""
        labelError=""
        placeholder="Type in your phone number"
        value={phoneNumberValue().value}
        valid={phoneNumberValue().valid}
        initial={phoneNumberOptions().initial}
        touched={phoneNumberOptions().touched}
        updateInputValue={updatePhoneNumberValue}
        updateInputOptions={updatePhoneNumberOptions}
      />
      <ButtonContainer>
        <FormButton
          isValid={emailAddress().valid || phoneNumberValue().valid}
          isDisabled={isMakingNetworkRequest()}
        >
          {isMakingNetworkRequest() ? "Check Your Phone" : "Login"}
        </FormButton>
      </ButtonContainer>
    </FormContainer>
  );
};

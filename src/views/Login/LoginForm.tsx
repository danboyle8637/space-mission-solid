import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { TextInput } from "../../components/forms/TextInput";
import { PhoneTextInput } from "../../components/forms/PhoneTextInput";
import { PhonePasscodeInput } from "../../components/forms/PhonePasscodeInput";
import { FormButton } from "../../components/buttons/FormButton";
import {
  emailAddress,
  emailAddressOptions,
  updateEmailAddressValue,
  updateEmailAddressOptions,
  phoneNumberValue,
  phoneNumberOptions,
  updatePhoneNumberValue,
  updatePhoneNumberOptions,
  resetLoginForm,
} from "../../../lib/loginStore";
import type { LoginEmailReqBody, LoginPhoneReqBody } from "../../types/api";

// TODO - DELETE THIS IN PRODUCTION
import { updateUser } from "../../../lib/userStore";
import type { UserDoc } from "../../types/index";

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

export const LoginForm: Component = () => {
  const navigate = useNavigate();

  const handleLoginForm = async (e: SubmitEvent) => {
    e.preventDefault();
    const email = emailAddress().value;
    const phoneNumber = phoneNumberValue().value;

    const emailBody: LoginEmailReqBody = {
      emailAddress: email,
    };

    const phoneBody: LoginPhoneReqBody = {
      phoneNumber: phoneNumber,
    };

    console.log(phoneBody);

    // const loginRes = await fetch("/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    // });

    // if (loginRes.status !== 200) {
    //   // Show error overlay...
    //   console.log("Getting an error from login endpoint");
    //   resetLoginForm();
    // }

    // const loginData = await loginRes.text();

    // console.log(loginData);

    // if (email === import.meta.env.VITE_DAN_EMAIL) {
    //   return navigate("/dashboard");
    // } else {
    //   resetLoginForm();
    // }
  };

  return (
    <FormContainer onSubmit={handleLoginForm}>
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
        updateInputValue={updateEmailAddressValue}
        updateInputOptions={updateEmailAddressOptions}
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
        <FormButton isValid={emailAddress().valid || phoneNumberValue().valid}>
          Login
        </FormButton>
      </ButtonContainer>
    </FormContainer>
  );
};

import { createEffect, createMemo } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../../components/images/SpaceMissionLogo";
import { PhonePasscodeInput } from "../../../components/forms/PhonePasscodeInput";
import { phonePasscode, phonePasscodeValue } from "../../../../lib/loginStore";
import { userLoginData, updateUserLoginData } from "../../../../lib/userStore";
import { getErrorMessage } from "../../../utils/helpers";
import type { AuthenticateExistingUserBody } from "../../../types/api";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
`;

const FormContainer = styled("form")`
  padding: 0 20px 40px 20px;
`;

export const CurrentUserForm: Component = () => {
  const navigate = useNavigate();

  const completeSignIn = async () => {
    const code = phonePasscode();

    console.log(code);

    // try {
    //   const url = "/auth/authenticate-user";

    //   const body: AuthenticateExistingUserBody = {
    //     phoneId: userLoginData().phoneId,
    //     code: code,
    //   };

    //   const authenticateRes = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   if (authenticateRes.status !== 200) {
    //     throw new Error("Authentication failed");
    //   }

    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(getErrorMessage(error));
    //   // Show an error overlay explaining the error
    //   // Send this form away and make the enter phone number form come back in
    //   updateUserLoginData("", false);
    //   // TODO - reset phone verify form so it's not valid
    // }
  };

  createMemo(() => {
    if (phonePasscodeValue().six.valid) {
      completeSignIn();
    }
  });

  return (
    <Container>
      <SpaceMissionLogo />
      <FormContainer>
        <PhonePasscodeInput />
      </FormContainer>
    </Container>
  );
};

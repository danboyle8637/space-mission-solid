import { createEffect, createMemo, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { PhonePasscodeInput } from "../../components/forms/PhonePasscodeInput";
import { showLoginForm, hideLoginForm } from "../../animations";
import {
  phonePasscode,
  phonePasscodeValue,
  toggleIsMakingNetworkRequest,
  showReturningMemberPasscodeForm,
} from "../../../lib/loginStore";
import { userLoginData } from "../../../lib/userStore";
import { getErrorMessage } from "../../utils/helpers";
import { fetchAuthenticateCurrentMember } from "../../utils/networkFunctions";
import type { AuthenticateCurrentMemberBody } from "../../types/api";

const ViewContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

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

const CurrentUserForm: Component = () => {
  let formRef: HTMLDivElement;

  const navigate = useNavigate();

  onMount(() => {
    showLoginForm(formRef);
  });

  createEffect(() => {
    if (!showReturningMemberPasscodeForm()) {
      hideLoginForm(formRef).finished.then(() => {
        navigate("/dashboard");
      });
    }
  });

  const completeSignIn = async () => {
    const code = phonePasscode();

    toggleIsMakingNetworkRequest();

    const verifyMemberBody: AuthenticateCurrentMemberBody = {
      code: code,
      phoneId: userLoginData().phoneId,
    };

    console.log("Request Body Before Going to Verify", verifyMemberBody);

    try {
      await fetchAuthenticateCurrentMember(verifyMemberBody);
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  };

  createMemo(() => {
    if (phonePasscode() !== "" && phonePasscodeValue().six.valid) {
      completeSignIn();
    }
  });

  return (
    <ViewContainer>
      <Container ref={formRef!}>
        <SpaceMissionLogo />
        <FormContainer>
          <PhonePasscodeInput />
        </FormContainer>
      </Container>
    </ViewContainer>
  );
};

export default CurrentUserForm;

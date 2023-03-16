import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { EnterPhoneForm } from "./EnterPhoneForm";
import { VerifyPhoneForm } from "./VerifyPhoneForm";

const FormContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-self: center;
`;

export const PhonePasscodeForm: Component = () => {
  return (
    <FormContainer>
      <EnterPhoneForm />
      <VerifyPhoneForm />
    </FormContainer>
  );
};

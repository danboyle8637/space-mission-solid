import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { PhonePasscodeInput } from "../../components/forms/PhonePasscodeInput";

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

export const VerifyPhoneForm: Component = () => {
  return (
    <Container>
      <SpaceMissionLogo />
      <PhonePasscodeInput />
    </Container>
  );
};

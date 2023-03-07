import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { EnterPhoneForm } from "./EnterPhoneForm";
import { VerifyPhoneForm } from "./VerifyPhoneForm";

const Container = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  isolation: isolate;
`;

const Galaxy = styled("div")`
  position: absolute;
  top: var(--galaxy-top);
  left: var(--galaxy-left);
  right: var(--galaxy-right);
  bottom: var(--galaxy-bottom);
  background-color: var(--galaxy-color);
  width: var(--galaxy-size);
  height: var(--galaxy-size);
  filter: blur(100px);
  z-index: -1;
`;

const LoginView: Component = () => {
  const galaxy1Styles = createMemo(
    () =>
      ({
        "--galaxy-top": 0,
        "--galaxy-left": 0,
        "--galaxy-right": "unset",
        "--galaxy-bottom": "unset",
        "--galaxy-color": "var(--accent-teal)",
        "--galaxy-size": "160px",
      } as JSX.CSSProperties)
  );

  const galaxy2Styles = createMemo(
    () =>
      ({
        "--galaxy-top": "unset",
        "--galaxy-left": "unset",
        "--galaxy-right": 0,
        "--galaxy-bottom": 0,
        "--galaxy-color": "var(--accent-pink)",
        "--galaxy-size": "120px",
      } as JSX.CSSProperties)
  );

  return (
    <Container>
      <VerifyPhoneForm />
      <Galaxy style={galaxy1Styles()} />
      <Galaxy style={galaxy2Styles()} />
    </Container>
  );
};

export default LoginView;

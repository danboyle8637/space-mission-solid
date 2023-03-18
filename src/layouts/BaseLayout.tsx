import { createMemo, children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX, JSXElement } from "solid-js";

import { GlobalStyles } from "../styles/Global";

interface LayoutProps {
  children: JSXElement;
}

const Container = styled("main")`
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  isolation: isolate;
`;

const Galaxy = styled("div")`
  position: fixed;
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

export const BaseLayout: Component<LayoutProps> = (props) => {
  const child = children(() => props.children);

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
    <>
      <GlobalStyles />
      <Container>
        {child()}
        <Galaxy style={galaxy1Styles()} />
        <Galaxy style={galaxy2Styles()} />
      </Container>
    </>
  );
};

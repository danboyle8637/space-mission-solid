import { children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement } from "solid-js";

import { GlobalStyles } from "../styles/Global";

interface LayoutProps {
  children: JSXElement;
}

export const BaseLayout: Component<LayoutProps> = (props) => {
  const child = children(() => props.children);

  return (
    <>
      <GlobalStyles />
      <main>{child()}</main>
    </>
  );
};

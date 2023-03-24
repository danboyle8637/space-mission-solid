import { children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement } from "solid-js";

import { CloseIcon } from "../cssDrawings/CloseIcon";
import { TerminalIcon } from "../svgs/TerminalIcon";

interface ChipProps {
  children: JSXElement;
}

const Container = styled("dialog")`
  position: fixed;
  left: 0;
  bottom: 60px;
  padding: 6px 20px;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  gap: 12px;
  align-items: center;
  background-color: hsla(337, 99%, 46%, 0.1);
  border: none;
  border-radius: 6px;
  width: 340px;
  box-shadow: 0 0 0 2px hsla(337, 99%, 46%, 1);
`;

const Message = styled("p")`
  font-size: 1.4rem;
  font-weight: 800;
  color: #f8f8f8;
`;

const Close = styled("div")`
  width: 30px;
  line-height: 0;
`;

const Terminal = styled("div")`
  width: 28px;
  line-height: 0;
`;

export const MessageChip: Component<ChipProps> = (props) => {
  const child = children(() => props.children);

  return (
    <Container>
      <Terminal>
        <TerminalIcon />
      </Terminal>
      <Message>{child()}</Message>
      <Close>
        <CloseIcon isOpen={true} width={28} />
      </Close>
    </Container>
  );
};

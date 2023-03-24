import { onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { animate, stagger, timeline } from "motion";
import type { Component } from "solid-js";

import { TerminalIcon } from "../../components/svgs/TerminalIcon";

const ViewContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled("div")`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 20px;
  width: max-content;
`;

const PreContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const Pre = styled("pre")`
  display: flex;
  gap: 3px;
  font-family: monospace;

  & span {
    font-size: 2.6rem;
    font-weight: 500;
    color: var(--accent-teal);
  }
`;

const Message = styled("span")`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8f8f8;
`;

const Icon = styled("div")`
  width: 60px;
`;

const CheckingForUser: Component = () => {
  onMount(() => {
    const sequence = [
      ["span", { x: [-8, 0], opacity: [0, 1] }, { delay: stagger(0.05) }],
      [
        "span",
        { x: [0, 8], opacity: [1, 0] },
        { delay: stagger(0.02), at: "-0.4" },
      ],
    ];

    timeline(sequence, { repeat: 3 });
  });

  return (
    <ViewContainer>
      <Container>
        <Icon>
          <TerminalIcon />
        </Icon>
        <Pre>
          <span>C</span>
          <span>H</span>
          <span>E</span>
          <span>C</span>
          <span>K</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span> </span>
          <span>F</span>
          <span>O</span>
          <span>R</span>
          <span> </span>
          <span>L</span>
          <span>O</span>
          <span>G</span>
          <span>G</span>
          <span>E</span>
          <span>D</span>
          <span> </span>
          <span>I</span>
          <span>N</span>
          <span> </span>
          <span>A</span>
          <span>S</span>
          <span>T</span>
          <span>R</span>
          <span>O</span>
          <span>N</span>
          <span>A</span>
          <span>U</span>
          <span>G</span>
          <span>H</span>
          <span>T</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </Pre>
      </Container>
    </ViewContainer>
  );
};

export default CheckingForUser;

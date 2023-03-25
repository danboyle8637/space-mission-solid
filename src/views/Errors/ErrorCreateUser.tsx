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

const Pre = styled("pre")`
  display: flex;
  gap: 3px;
  font-family: monospace;

  & span {
    font-size: 2.6rem;
    font-weight: 500;
    color: #e9015a;
  }
`;

const Icon = styled("div")`
  width: 60px;
`;

const ErrorCreateUser: Component = () => {
  let containerRef: HTMLDivElement;

  onMount(() => {
    const sequence: any = [
      [".char", { x: [-8, 0], opacity: [0, 1] }, { delay: stagger(0.05) }],
      [
        ".char",
        { x: [0, 8], opacity: [1, 0] },
        { delay: stagger(0.02), at: "-0.4" },
      ],
    ];

    timeline(sequence, { repeat: 1 }).finished.then(() => {
      animate(
        ".char",
        { x: [-8, 0], opacity: [0, 1] },
        { delay: stagger(0.05) }
      );
    });
  });

  return (
    <ViewContainer ref={containerRef!}>
      <Container>
        <Icon>
          <TerminalIcon />
        </Icon>
        <Pre>
          <span class="char">E</span>
          <span class="char">R</span>
          <span class="char">R</span>
          <span class="char">O</span>
          <span class="char">R</span>
          <span class="char"> </span>
          <span class="char">E</span>
          <span class="char">N</span>
          <span class="char">R</span>
          <span class="char">O</span>
          <span class="char">L</span>
          <span class="char">L</span>
          <span class="char">I</span>
          <span class="char">N</span>
          <span class="char">G</span>
          <span class="char">.</span>
          <span class="char">.</span>
          <span class="char">.</span>
        </Pre>
      </Container>
    </ViewContainer>
  );
};

export default ErrorCreateUser;

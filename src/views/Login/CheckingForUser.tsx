import { createEffect, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import { animate, stagger, timeline } from "motion";
import type { Component } from "solid-js";

import { TerminalIcon } from "../../components/svgs/TerminalIcon";
import { hideCheckUserView } from "../../animations";
import { user } from "../../../lib/userStore";

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
  let containerRef: HTMLDivElement;

  const navigate = useNavigate();

  const [shouldNavigate, setShouldNavigate] = createSignal<boolean>(false);

  const navigateFromView = () => {
    setShouldNavigate(true);
  };

  onMount(() => {
    const getDevCookie = async () => {
      const res = await fetch("/dev-api/auth", {
        method: "GET",
      });

      const message = await res.text();

      return message;
    };

    getDevCookie();

    const sequence: any = [
      [".char", { x: [-8, 0], opacity: [0, 1] }, { delay: stagger(0.05) }],
      [
        ".char",
        { x: [0, 8], opacity: [1, 0] },
        { delay: stagger(0.02), at: "-0.4" },
      ],
    ];

    timeline(sequence, { repeat: 2 }).finished.then(() => {
      animate(
        ".char",
        { x: [-8, 0], opacity: [0, 1] },
        { delay: stagger(0.05) }
      ).finished.then(() => {
        navigateFromView();
      });
    });
  });

  createEffect(() => {
    if (shouldNavigate()) {
      hideCheckUserView(containerRef).finished.then(() => {
        if (user().firstName !== "") {
          // navigate("/dashboard");
        }

        if (user().firstName === "") {
          // navigate("/login");
        }
      });
    }
  });

  return (
    <ViewContainer ref={containerRef!}>
      <Container>
        <Icon>
          <TerminalIcon />
        </Icon>
        <Pre>
          <span class="char">C</span>
          <span class="char">H</span>
          <span class="char">E</span>
          <span class="char">C</span>
          <span class="char">K</span>
          <span class="char">I</span>
          <span class="char">N</span>
          <span class="char">G</span>
          <span class="char"> </span>
          <span class="char">F</span>
          <span class="char">O</span>
          <span class="char">R</span>
          <span class="char"> </span>
          <span class="char">L</span>
          <span class="char">O</span>
          <span class="char">G</span>
          <span class="char">G</span>
          <span class="char">E</span>
          <span class="char">D</span>
          <span class="char"> </span>
          <span class="char">I</span>
          <span class="char">N</span>
          <span class="char"> </span>
          <span class="char">A</span>
          <span class="char">S</span>
          <span class="char">T</span>
          <span class="char">R</span>
          <span class="char">O</span>
          <span class="char">N</span>
          <span class="char">A</span>
          <span class="char">U</span>
          <span class="char">G</span>
          <span class="char">H</span>
          <span class="char">T</span>
          <span class="char">.</span>
          <span class="char">.</span>
          <span class="char">.</span>
        </Pre>
      </Container>
    </ViewContainer>
  );
};

export default CheckingForUser;

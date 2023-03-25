import {
  createEffect,
  createMemo,
  createSignal,
  onMount,
  onError,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { styled } from "solid-styled-components";
import { animate, stagger, timeline } from "motion";
import type { Component } from "solid-js";

import { TerminalIcon } from "../../components/svgs/TerminalIcon";
import { hideCheckUserView } from "../../animations";
import { getTestEndpoint, createUser } from "../../utils/networkFunctions";
import { user } from "../../../lib/userStore";
import {
  firstNameValue,
  callSignValue,
  emailAddress,
} from "../../../lib/loginStore";
import { getErrorMessage } from "../../utils/helpers";
import type { CreateUserBody } from "../../types/api";

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

const CreateNewUser: Component = () => {
  let containerRef: HTMLDivElement;

  const navigate = useNavigate();

  const [shouldNavigate, setShouldNavigate] = createSignal<boolean>(false);

  const navigateFromView = () => {
    setShouldNavigate(true);
  };

  onMount(async () => {
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

    try {
      const body: CreateUserBody = {
        firstName: firstNameValue().value,
        emailAddress: emailAddress().value,
        callSign: callSignValue().value,
      };

      await createUser(body);
    } catch (error) {
      navigate("/error/create-user");
    }
  });

  // createEffect(() => {
  //   if (shouldNavigate()) {
  //     hideCheckUserView(containerRef).finished.then(() => {
  //       if (user().firstName !== "") {
  //         // navigate("/dashboard");
  //       }

  //       if (user().firstName === "") {
  //         // navigate("/login");
  //       }
  //     });
  //   }
  // });

  return (
    <ViewContainer ref={containerRef!}>
      <Container>
        <Icon>
          <TerminalIcon />
        </Icon>
        <Pre>
          <span class="char">E</span>
          <span class="char">N</span>
          <span class="char">R</span>
          <span class="char">O</span>
          <span class="char">L</span>
          <span class="char">L</span>
          <span class="char">I</span>
          <span class="char">N</span>
          <span class="char">G</span>
          <span class="char"> </span>
          <span class="char">I</span>
          <span class="char">N</span>
          <span class="char"> </span>
          <span class="char">S</span>
          <span class="char">P</span>
          <span class="char">A</span>
          <span class="char">C</span>
          <span class="char">E</span>
          <span class="char"> </span>
          <span class="char">M</span>
          <span class="char">I</span>
          <span class="char">S</span>
          <span class="char">S</span>
          <span class="char">I</span>
          <span class="char">O</span>
          <span class="char">N</span>
          <span class="char">.</span>
          <span class="char">.</span>
          <span class="char">.</span>
        </Pre>
      </Container>
    </ViewContainer>
  );
};

export default CreateNewUser;

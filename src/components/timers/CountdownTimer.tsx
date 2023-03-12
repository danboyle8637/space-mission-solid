import { createSignal, createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

const Container = styled("div")`
  padding: 6px 18px;
  display: grid;
  grid-template-columns: 1fr min-content 1fr min-content 1fr;
  gap: 4px;
  align-items: center;
  background-color: #313056;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px hsla(0, 0%, 0%, 0.3);
  width: max-content;
`;

const Number = styled("p")`
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--accent-purple);
`;

const Separator = styled("p")`
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--accent-pink);
`;

export const CountdownTimer: Component = () => {
  const [minutes, setMinutes] = createSignal<number>(2);
  const [seconds, setSeconds] = createSignal<number>(0);
  const [milliseconds, setMilliseconds] = createSignal<number>(0);

  // createEffect(() => {
  //   if (seconds() < 0) {
  //     setSeconds(() => 59);
  //   }

  //   const setSecs = setTimeout(() => {
  //     setSeconds((prevValue) => {
  //       return prevValue - 1;
  //     });
  //   }, 1000);

  //   if (minutes() === 0 && seconds() === 0) {
  //     clearInterval(setSecs);
  //   }
  // });

  // createEffect(() => {
  //   if (milliseconds() < 0) {
  //     setMilliseconds(() => 59);
  //   }

  //   const setMilli = setTimeout(() => {
  //     setMilliseconds((prevValue) => {
  //       return prevValue - 1;
  //     });
  //   }, 100);

  //   if (minutes() === 0 && seconds() === 0) {
  //     clearTimeout(setMilli);
  //   }
  // });

  return (
    <Container>
      <Number>02</Number>
      <Separator>:</Separator>
      <Number>{seconds()}</Number>
      <Separator>:</Separator>
      <Number>{milliseconds()}</Number>
    </Container>
  );
};

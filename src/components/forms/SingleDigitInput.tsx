import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { BaseTextInput } from "./BaseTextInput";
import type { UpdateValueFunction, UpdateOptionsFunction } from "../../types";

interface InputProps {
  ref: HTMLInputElement;
  inputType: string;
  inputName: string;
  labelName: string;
  labelFor: string;
  value: string;
  valid: boolean;
  initial: boolean;
  touched: boolean;
  updateInputValue: UpdateValueFunction;
  updateInputOptions: UpdateOptionsFunction;
}

const InputContainer = styled("div")`
  padding: 4px;
  background-color: #313056;
  border-radius: 8px;
  box-shadow: 0 0 0 3px var(--active-border-color);
  aspect-ratio: 1 / 1;
  transition: box-shadow 200ms ease-in-out;
`;

export const SingleDigitInput: Component<InputProps> = (props) => {
  const styles = createMemo(
    () =>
      ({
        "--active-border-color": props.touched
          ? "var(--accent-teal)"
          : "#151428",
      } as JSX.CSSProperties)
  );

  return (
    <InputContainer style={styles()}>
      <BaseTextInput
        ref={props.ref}
        inputType={props.inputType}
        inputName={props.inputName}
        labelFor={props.labelFor}
        labelName={props.labelName}
        placeholder="-"
        maxLength={1}
        value={props.value}
        valid={props.valid}
        initial={props.initial}
        touched={props.touched}
        updateInputValue={props.updateInputValue}
        updateInputOptions={props.updateInputOptions}
      />
    </InputContainer>
  );
};

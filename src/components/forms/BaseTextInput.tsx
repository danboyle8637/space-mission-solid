import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement } from "solid-js";

import type { UpdateValueFunction, UpdateOptionsFunction } from "../../types";

interface InputProps {
  ref: HTMLInputElement;
}

interface InputProps {
  inputType: string;
  inputName: string;
  labelName: string;
  labelFor: string;
  labelError?: string;
  labelInstructions?: string;
  placeholder: string;
  maxLength: number;
  value: string;
  valid: boolean;
  initial: boolean;
  touched: boolean;
  updateInputValue: UpdateValueFunction;
  updateInputOptions: UpdateOptionsFunction;
}

const InputField = styled("input")`
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-purple);
  text-align: center;
  background: #313056;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  caret-color: var(--accent-teal);
  &::placeholder {
    font-size: 1.6rem;
    color: var(--accent-purple);
  }
`;

export const BaseTextInput: Component<InputProps> = (props) => {
  return (
    <InputField
      ref={props.ref}
      type={props.inputType}
      id={props.inputName}
      auto-complete="off"
      name={props.inputName}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      value={props.value}
      onInput={props.updateInputValue}
      onFocus={props.updateInputOptions}
      onBlur={props.updateInputOptions}
    />
  );
};

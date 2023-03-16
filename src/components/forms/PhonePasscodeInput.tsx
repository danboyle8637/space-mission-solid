import { createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SingleDigitInput } from "./SingleDigitInput";
import {
  phonePasscodeValue,
  phonePasscodeOptions,
  updatePhonePasscodeValue,
  updatePhonePasscodeOptions,
  setPhonePasscode,
} from "../../../lib/loginStore";

const Contianer = styled("form")`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;

export const PhonePasscodeInput: Component = () => {
  let inputRef1: HTMLInputElement;
  let inputRef2: HTMLInputElement;
  let inputRef3: HTMLInputElement;
  let inputRef4: HTMLInputElement;
  let inputRef5: HTMLInputElement;
  let inputRef6: HTMLInputElement;

  createEffect(() => {
    const valid1 = phonePasscodeValue().one.valid;
    const valid2 = phonePasscodeValue().two.valid;
    const valid3 = phonePasscodeValue().three.valid;
    const valid4 = phonePasscodeValue().four.valid;
    const valid5 = phonePasscodeValue().five.valid;
    const valid6 = phonePasscodeValue().six.valid;

    if (!valid1 && !valid2 && !valid3 && !valid4 && !valid5 && !valid6) {
      inputRef1.focus();
    }

    if (valid1) {
      inputRef2.focus();
    }

    if (valid2) {
      inputRef3.focus();
    }

    if (valid3) {
      inputRef4.focus();
    }

    if (valid4) {
      inputRef5.focus();
    }

    if (valid5) {
      inputRef6.focus();
    }

    if (valid6) {
      inputRef6.blur();
    }
  });

  createMemo(() => {
    if (phonePasscodeValue().six.valid) {
      const passcode = `${phonePasscodeValue().one.value}${
        phonePasscodeValue().two.value
      }${phonePasscodeValue().three.value}${phonePasscodeValue().four.value}${
        phonePasscodeValue().five.value
      }${phonePasscodeValue().six.value}`;

      setPhonePasscode(passcode);
    }
  });

  return (
    <Contianer>
      <SingleDigitInput
        ref={inputRef1!}
        inputType="text"
        inputName="one"
        labelFor="one"
        labelName="one"
        value={phonePasscodeValue().one.value}
        valid={phonePasscodeValue().one.valid}
        initial={phonePasscodeOptions().one.initial}
        touched={phonePasscodeOptions().one.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef2!}
        inputType="text"
        inputName="two"
        labelFor="two"
        labelName="two"
        value={phonePasscodeValue().two.value}
        valid={phonePasscodeValue().two.valid}
        initial={phonePasscodeOptions().two.initial}
        touched={phonePasscodeOptions().two.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef3!}
        inputType="text"
        inputName="three"
        labelFor="three"
        labelName="three"
        value={phonePasscodeValue().three.value}
        valid={phonePasscodeValue().three.valid}
        initial={phonePasscodeOptions().three.initial}
        touched={phonePasscodeOptions().three.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef4!}
        inputType="text"
        inputName="four"
        labelFor="four"
        labelName="four"
        value={phonePasscodeValue().four.value}
        valid={phonePasscodeValue().four.valid}
        initial={phonePasscodeOptions().four.initial}
        touched={phonePasscodeOptions().four.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef5!}
        inputType="text"
        inputName="five"
        labelFor="five"
        labelName="five"
        value={phonePasscodeValue().five.value}
        valid={phonePasscodeValue().five.valid}
        initial={phonePasscodeOptions().five.initial}
        touched={phonePasscodeOptions().five.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef6!}
        inputType="text"
        inputName="six"
        labelFor="six"
        labelName="six"
        value={phonePasscodeValue().six.value}
        valid={phonePasscodeValue().six.valid}
        initial={phonePasscodeOptions().six.initial}
        touched={phonePasscodeOptions().six.touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
    </Contianer>
  );
};

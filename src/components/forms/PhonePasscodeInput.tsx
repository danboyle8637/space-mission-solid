import { createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SingleDigitInput } from "./SingleDigitInput";
import {
  phonePasscodeValue1,
  phonePasscodeOptions1,
  phonePasscodeValue2,
  phonePasscodeOptions2,
  phonePasscodeValue3,
  phonePasscodeOptions3,
  phonePasscodeValue4,
  phonePasscodeOptions4,
  phonePasscodeValue5,
  phonePasscodeOptions5,
  phonePasscodeValue6,
  phonePasscodeOptions6,
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
    const valid1 = phonePasscodeValue1().valid;
    const valid2 = phonePasscodeValue2().valid;
    const valid3 = phonePasscodeValue3().valid;
    const valid4 = phonePasscodeValue4().valid;
    const valid5 = phonePasscodeValue5().valid;
    const valid6 = phonePasscodeValue6().valid;

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
    if (phonePasscodeValue6().valid) {
      const passcode = `${phonePasscodeValue1().value}${
        phonePasscodeValue2().value
      }${phonePasscodeValue3().value}${phonePasscodeValue4().value}${
        phonePasscodeValue5().value
      }${phonePasscodeValue6().value}`;

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
        value={phonePasscodeValue1().value}
        valid={phonePasscodeValue1().valid}
        initial={phonePasscodeOptions1().initial}
        touched={phonePasscodeOptions1().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef2!}
        inputType="text"
        inputName="two"
        labelFor="two"
        labelName="two"
        value={phonePasscodeValue2().value}
        valid={phonePasscodeValue2().valid}
        initial={phonePasscodeOptions2().initial}
        touched={phonePasscodeOptions2().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef3!}
        inputType="text"
        inputName="three"
        labelFor="three"
        labelName="three"
        value={phonePasscodeValue3().value}
        valid={phonePasscodeValue3().valid}
        initial={phonePasscodeOptions3().initial}
        touched={phonePasscodeOptions3().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef4!}
        inputType="text"
        inputName="four"
        labelFor="four"
        labelName="four"
        value={phonePasscodeValue4().value}
        valid={phonePasscodeValue4().valid}
        initial={phonePasscodeOptions4().initial}
        touched={phonePasscodeOptions4().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef5!}
        inputType="text"
        inputName="five"
        labelFor="five"
        labelName="five"
        value={phonePasscodeValue5().value}
        valid={phonePasscodeValue5().valid}
        initial={phonePasscodeOptions5().initial}
        touched={phonePasscodeOptions5().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
      <SingleDigitInput
        ref={inputRef6!}
        inputType="text"
        inputName="six"
        labelFor="six"
        labelName="six"
        value={phonePasscodeValue6().value}
        valid={phonePasscodeValue6().valid}
        initial={phonePasscodeOptions6().initial}
        touched={phonePasscodeOptions6().touched}
        updateInputValue={updatePhonePasscodeValue}
        updateInputOptions={updatePhonePasscodeOptions}
      />
    </Contianer>
  );
};

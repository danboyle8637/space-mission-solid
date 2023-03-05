import { createSignal } from "solid-js";

import { formatPhoneInput } from "../src/utils/helpers";
import { formValidator } from "../src/utils/validators";
import { emailValidationRules } from "../src/utils/validators/rules";
import type { InputValue, InputOptions } from "../src/types";

export const [emailAddress, setEmailAddress] = createSignal<InputValue>({
  value: "",
  valid: false,
});

export const [emailAddressOptions, setEmailAddressOptions] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const updateEmailAddressValue = (event: InputEvent) => {
  const inputElement = event.currentTarget as HTMLInputElement;
  const value = inputElement.value;
  const valid = formValidator(value, emailValidationRules);

  setEmailAddress(() => ({
    value: value,
    valid: valid,
  }));
};

export const updateEmailAddressOptions = () => {
  setEmailAddressOptions((prevState) => ({
    initial: false,
    touched: !prevState.touched,
  }));
};

export const [phoneNumberValue, setPhoneNumberValue] = createSignal<InputValue>(
  {
    value: "",
    valid: false,
  }
);

export const [phoneNumberOptions, setPhoneNumberOptions] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const updatePhoneNumberValue = (e: InputEvent) => {
  const inputElement = e.currentTarget as HTMLInputElement;
  const value = inputElement.value;

  setPhoneNumberValue(() => ({
    value: formatPhoneInput(value),
    valid: true,
  }));
};

export const updatePhoneNumberOptions = () => {
  setPhoneNumberOptions((prevValue) => ({
    initial: false,
    touched: !prevValue.touched,
  }));
};

export const resetLoginForm = () => {
  setEmailAddress(() => ({
    value: "",
    valid: false,
  }));
  setEmailAddressOptions(() => ({
    initial: true,
    touched: false,
  }));
};

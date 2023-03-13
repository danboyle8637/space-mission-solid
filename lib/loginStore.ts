import { createSignal } from "solid-js";

import { formatPhoneInput } from "../src/utils/helpers";
import { formValidator } from "../src/utils/validators";
import {
  emailValidationRules,
  firstNameValidationRules,
} from "../src/utils/validators/rules";
import type { InputValue, InputOptions } from "../src/types";

export const [firstNameValue, setFirstNameValue] = createSignal<InputValue>({
  value: "",
  valid: false,
});

export const [firstNameOptions, setFirstNameOptions] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [callSignValue, setCallSignValue] = createSignal<InputValue>({
  value: "",
  valid: false,
});

export const [callSignOptions, setCallSignOptions] = createSignal<InputOptions>(
  {
    initial: true,
    touched: false,
  }
);

export const [emailAddress, setEmailAddress] = createSignal<InputValue>({
  value: "",
  valid: false,
});

export const [emailAddressOptions, setEmailAddressOptions] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const updateInputValue = (e: InputEvent) => {
  const currentTarget = e.currentTarget as HTMLInputElement;
  const name = currentTarget.name;
  const value = currentTarget.value;

  switch (name) {
    case "firstName": {
      const valid = formValidator(value, firstNameValidationRules);

      setFirstNameValue(() => ({
        value: value,
        valid: valid,
      }));
      break;
    }
    case "emailAddress": {
      const valid = formValidator(value, emailValidationRules);

      setEmailAddress(() => ({
        value: value,
        valid: valid,
      }));
      break;
    }
    case "callSign": {
      const valid = value.length > 0 && value.length < 20;

      setCallSignValue(() => ({
        value: value,
        valid: valid,
      }));
      break;
    }
    default: {
      return;
    }
  }
};

export const updateInputOptions = (e: FocusEvent) => {
  const currentTarget = e.currentTarget as HTMLInputElement;
  const name = currentTarget.name;

  switch (name) {
    case "firstName": {
      setFirstNameOptions((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "emailAddress": {
      setEmailAddressOptions((prevState) => ({
        initial: false,
        touched: !prevState.touched,
      }));
      break;
    }
    case "callSign": {
      setCallSignOptions((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    default: {
      return;
    }
  }
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

// *************** Phone Validation *************** //

export const [phonePasscode, setPhonePasscode] = createSignal<string>("");

export const [phonePasscodeValue1, setPhonePasscodeValue1] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions1, setPhonePasscodeOptions1] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [phonePasscodeValue2, setPhonePasscodeValue2] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions2, setPhonePasscodeOptions2] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [phonePasscodeValue3, setPhonePasscodeValue3] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions3, setPhonePasscodeOptions3] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [phonePasscodeValue4, setPhonePasscodeValue4] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions4, setPhonePasscodeOptions4] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [phonePasscodeValue5, setPhonePasscodeValue5] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions5, setPhonePasscodeOptions5] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const [phonePasscodeValue6, setPhonePasscodeValue6] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [phonePasscodeOptions6, setPhonePasscodeOptions6] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const updatePhonePasscodeValue = (e: InputEvent) => {
  const inputElement = e.currentTarget as HTMLInputElement;
  const name = inputElement.name;
  const value = inputElement.value;

  switch (name) {
    case "one": {
      setPhonePasscodeValue1(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
    case "two": {
      setPhonePasscodeValue2(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
    case "three": {
      setPhonePasscodeValue3(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
    case "four": {
      setPhonePasscodeValue4(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
    case "five": {
      setPhonePasscodeValue5(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
    case "six": {
      setPhonePasscodeValue6(() => ({
        value: value,
        valid: value.length > 0,
      }));
      break;
    }
  }
};

export const updatePhonePasscodeOptions = (e: FocusEvent) => {
  const inputElement = e.currentTarget as HTMLInputElement;
  const name = inputElement.name;

  switch (name) {
    case "one": {
      setPhonePasscodeOptions1((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "two": {
      setPhonePasscodeOptions2((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "three": {
      setPhonePasscodeOptions3((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "four": {
      setPhonePasscodeOptions4((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "five": {
      setPhonePasscodeOptions5((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
    case "six": {
      setPhonePasscodeOptions6((prevValue) => ({
        initial: false,
        touched: !prevValue.touched,
      }));
      break;
    }
  }
};

export const updatePhonePasscode = (passcode: string) => {
  setPhonePasscode(passcode);
};

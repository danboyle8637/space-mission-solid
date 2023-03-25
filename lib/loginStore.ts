import { createSignal } from "solid-js";

import { formatPhoneInput } from "../src/utils/helpers";
import { formValidator } from "../src/utils/validators";
import {
  emailValidationRules,
  firstNameValidationRules,
} from "../src/utils/validators/rules";
import type { InputValue, InputOptions } from "../src/types";

// *************** Login Network Requests *************** //

export const [isAuthenticated, setIsAuthenticated] =
  createSignal<boolean>(false);

export const toggleIsAuthenticated = () => {
  setIsAuthenticated((prevValue) => !prevValue);
};

export const [isMakingNetworkRequest, setIsMakingNetworkRequest] =
  createSignal<boolean>(false);

export const toggleIsMakingNetworkRequest = () => {
  setIsMakingNetworkRequest((prevValue) => !prevValue);
};

export const [isPhoneVerified, setIsPhoneVerified] =
  createSignal<boolean>(false);

export const toggleIsPhoneVerified = () => {
  setIsPhoneVerified((prevValue) => !prevValue);
};

export const [showPhoneForm, setShowPhoneForm] = createSignal<boolean>(true);

export const updateShowPhoneForm = (shouldShow: boolean) => {
  setShowPhoneForm(shouldShow);
};

export const [showNewMemberPasscodeForm, setShowNewMemberPasscodeForm] =
  createSignal<boolean>(true);

export const updateShowNewMemberPasscodeForm = (shouldShow: boolean) => {
  setShowNewMemberPasscodeForm(shouldShow);
};

export const [
  showReturningMemberPasscodeForm,
  setShowReturningMemberPasscodeForm,
] = createSignal<boolean>(true);

export const updateShowReturningMemberPasscodeForm = (shouldShow: boolean) => {
  setShowReturningMemberPasscodeForm(shouldShow);
};

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
  const regex = /^[0-9]+$/;
  const valid = regex.test(value);

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

interface phonePasscodeValueState {
  one: {
    value: string;
    valid: boolean;
  };
  two: {
    value: string;
    valid: boolean;
  };
  three: {
    value: string;
    valid: boolean;
  };
  four: {
    value: string;
    valid: boolean;
  };
  five: {
    value: string;
    valid: boolean;
  };
  six: {
    value: string;
    valid: boolean;
  };
}

interface phonePasscodeOptionsState {
  one: {
    initial: boolean;
    touched: boolean;
  };
  two: {
    initial: boolean;
    touched: boolean;
  };
  three: {
    initial: boolean;
    touched: boolean;
  };
  four: {
    initial: boolean;
    touched: boolean;
  };
  five: {
    initial: boolean;
    touched: boolean;
  };
  six: {
    initial: boolean;
    touched: boolean;
  };
}

export const [phonePasscode, setPhonePasscode] = createSignal<string>("");

export const [phonePasscodeValue, setPhonePasscodeValue] =
  createSignal<phonePasscodeValueState>({
    one: {
      value: "",
      valid: false,
    },
    two: {
      value: "",
      valid: false,
    },
    three: {
      value: "",
      valid: false,
    },
    four: {
      value: "",
      valid: false,
    },
    five: {
      value: "",
      valid: false,
    },
    six: {
      value: "",
      valid: false,
    },
  });

export const [phonePasscodeOptions, setPhonePasscodeOptions] =
  createSignal<phonePasscodeOptionsState>({
    one: {
      initial: true,
      touched: false,
    },
    two: {
      initial: true,
      touched: false,
    },
    three: {
      initial: true,
      touched: false,
    },
    four: {
      initial: true,
      touched: false,
    },
    five: {
      initial: true,
      touched: false,
    },
    six: {
      initial: true,
      touched: false,
    },
  });

// export const [phonePasscodeValue1, setPhonePasscodeValue1] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions1, setPhonePasscodeOptions1] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

// export const [phonePasscodeValue2, setPhonePasscodeValue2] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions2, setPhonePasscodeOptions2] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

// export const [phonePasscodeValue3, setPhonePasscodeValue3] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions3, setPhonePasscodeOptions3] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

// export const [phonePasscodeValue4, setPhonePasscodeValue4] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions4, setPhonePasscodeOptions4] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

// export const [phonePasscodeValue5, setPhonePasscodeValue5] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions5, setPhonePasscodeOptions5] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

// export const [phonePasscodeValue6, setPhonePasscodeValue6] =
//   createSignal<InputValue>({
//     value: "",
//     valid: false,
//   });

// export const [phonePasscodeOptions6, setPhonePasscodeOptions6] =
//   createSignal<InputOptions>({
//     initial: true,
//     touched: false,
//   });

export const updatePhonePasscodeValue = (e: InputEvent) => {
  const inputElement = e.currentTarget as HTMLInputElement;
  const name = inputElement.name;
  const value = inputElement.value;

  const regex = /^[0-9]+$/;
  const valid = regex.test(value);

  switch (name) {
    case "one": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        one: {
          value: value,
          valid: valid,
        },
      }));
      break;
    }
    case "two": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        two: {
          value: value,
          valid: valid,
        },
      }));
      break;
    }
    case "three": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        three: {
          value: value,
          valid: valid,
        },
      }));
      break;
    }
    case "four": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        four: {
          value: value,
          valid: valid,
        },
      }));
      break;
    }
    case "five": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        five: {
          value: value,
          valid: valid,
        },
      }));
      break;
    }
    case "six": {
      setPhonePasscodeValue((prevState) => ({
        ...prevState,
        six: {
          value: value,
          valid: valid,
        },
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
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        one: {
          initial: false,
          touched: !prevState.one.touched,
        },
      }));
      break;
    }
    case "two": {
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        two: {
          initial: false,
          touched: !prevState.two.touched,
        },
      }));
      break;
    }
    case "three": {
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        three: {
          initial: false,
          touched: !prevState.three.touched,
        },
      }));
      break;
    }
    case "four": {
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        four: {
          initial: false,
          touched: !prevState.four.touched,
        },
      }));
      break;
    }
    case "five": {
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        five: {
          initial: false,
          touched: !prevState.five.touched,
        },
      }));
      break;
    }
    case "six": {
      setPhonePasscodeOptions((prevState) => ({
        ...prevState,
        six: {
          initial: false,
          touched: !prevState.six.touched,
        },
      }));
      break;
    }
  }
};

export const updatePhonePasscode = (passcode: string) => {
  setPhonePasscode(passcode);
};

export const resetPhonePasscode = () => {
  setPhonePasscodeValue(() => ({
    one: {
      value: "",
      valid: false,
    },
    two: {
      value: "",
      valid: false,
    },
    three: {
      value: "",
      valid: false,
    },
    four: {
      value: "",
      valid: false,
    },
    five: {
      value: "",
      valid: false,
    },
    six: {
      value: "",
      valid: false,
    },
  }));

  setPhonePasscodeOptions(() => ({
    one: {
      initial: true,
      touched: false,
    },
    two: {
      initial: true,
      touched: false,
    },
    three: {
      initial: true,
      touched: false,
    },
    four: {
      initial: true,
      touched: false,
    },
    five: {
      initial: true,
      touched: false,
    },
    six: {
      initial: true,
      touched: false,
    },
  }));
};

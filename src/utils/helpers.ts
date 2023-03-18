export const capitalizeName = (name: string) => {
  const nameArray = name.split("");
  const firstChar = nameArray.shift()?.toUpperCase();

  if (firstChar) {
    nameArray.unshift(firstChar);
    const cappedName = nameArray.join("");

    return cappedName;
  } else {
    return "";
  }
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const toggleScrollingOnOverlay = (isOpen: boolean) => {
  if (window && document && isOpen) {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}`;
  }

  if (window && document && !isOpen) {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  }
};

export const formatPhoneInput = (input: string) => {
  if (input.length > 0) {
    const digits = input.replace(/\D/g, "").substring(0, 10);
    const areaCode = digits.substring(0, 3);
    const prefix = digits.substring(3, 6);
    const lineNumber = digits.substring(6);
    let formatted = "";

    if (digits.length > 6) {
      formatted = `(${areaCode}) ${prefix}-${lineNumber}`;
    } else if (digits.length > 3) {
      formatted = `(${areaCode}) ${prefix}`;
    } else if (digits.length > 0) {
      formatted = `(${areaCode}`;
    }

    return formatted;
  }

  return "";
};

export const getExpiresAtTimestamp = (expiresAt: string) => {
  const date = new Date(expiresAt);
  const timestamp = date.getTime();
  return timestamp;
};

export const sanitizePhoneNumber = (phoneNumber: string) => {
  let cleanedNumber: string = "+1";

  for (let i = 0; i < phoneNumber.length; i++) {
    if (
      phoneNumber[i] === "(" ||
      phoneNumber[i] === ")" ||
      phoneNumber[i] === "-" ||
      phoneNumber[i] === " "
    ) {
      continue;
    }
    cleanedNumber = cleanedNumber + phoneNumber[i];
  }

  return cleanedNumber;
};

export const hashData = async (data: string) => {
  const uint8Data = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", uint8Data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

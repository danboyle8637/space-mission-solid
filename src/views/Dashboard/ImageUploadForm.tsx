import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { ImageUploadInput } from "../../components/forms/ImageUploadInput";
import { FormButton } from "../../components/buttons/FormButton";
import { avatarImageData } from "../../../lib/avatarImageStore";
import { updateUser } from "../../../lib/userStore";
import type { UserDoc } from "../../types";

const FormContainer = styled("form")`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  width: 300px;
`;

const ButtonContainer = styled("div")`
  width: 260px;
`;

export const ImageUploadForm: Component = () => {
  const handleAvatarImageForm = (e: SubmitEvent) => {
    e.preventDefault();

    const imageData = avatarImageData();

    console.log(imageData);
  };

  return (
    <FormContainer onSubmit={handleAvatarImageForm}>
      <ImageUploadInput />
      <ButtonContainer>
        <FormButton isValid={avatarImageData().length > 0} isDisabled={false}>
          Save Space Avatar
        </FormButton>
      </ButtonContainer>
    </FormContainer>
  );
};

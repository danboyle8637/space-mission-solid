import { createSignal } from "solid-js";

export const [avatarImageData, setAvatarImageData] = createSignal<string>("");

export const updateAvatarImageData = (imageData: string) => {
  setAvatarImageData(imageData);
};

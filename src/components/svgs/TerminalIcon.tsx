import type { Component } from "solid-js";
import type { SVGProps } from "./SpaceMission";

export const TerminalIcon: Component<SVGProps> = (props) => {
  return (
    <svg
      viewBox="0 0 308 231"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
    >
      <path fill="none" d="M0 0h307.065v230.495H0z" />
      <path
        d="M30.073 226.315c3.81 3.81 9.987 3.81 13.797 0l103.24-103.239c3.81-3.81 3.81-9.987 0-13.797l-24.126-24.125c-3.81-3.81-9.987-3.81-13.797 0L5.948 188.393c-3.81 3.81-3.81 9.987 0 13.797l24.125 24.125Z"
        fill="var(--terminal-color, #f8f8f8)"
        fill-opacity=".5"
      />
      <path
        d="M160.784 215.065a7.317 7.317 0 0 0 7.317 7.317h129.054a7.313 7.313 0 0 0 7.317-7.317v-21.011a7.317 7.317 0 0 0-7.317-7.317H168.101a7.314 7.314 0 0 0-7.317 7.317v21.011ZM147.11 123.076c3.81-3.81 3.81-9.987 0-13.797L43.87 6.039c-3.81-3.809-9.987-3.809-13.797 0L5.948 30.165c-3.81 3.81-3.81 9.987 0 13.797l103.239 103.239c3.81 3.81 9.987 3.81 13.797 0l24.126-24.125Z"
        fill="var(--terminal-color, #f8f8f8)"
      />
    </svg>
  );
};

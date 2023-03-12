import { createResource } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { Header } from "./Header";
import { AstronautDataBar } from "./AstronautDataBar";
import { MissionCards } from "./MissionCards";

import { missions } from "../../../data/missions";

const ViewContainer = styled("div")`
  position: relative;
  padding: 40px 12px 200px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  width: 100%;
  isolation: isolate;
`;

const HeaderContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
`;

const BlueGalaxy = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;

const PinkGalaxy = styled("div")`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;

const DashboardView: Component = () => {
  return (
    <ViewContainer>
      <HeaderContainer>
        <Header />
        <AstronautDataBar />
      </HeaderContainer>
      <MissionCards missions={missions} />
      <BlueGalaxy />
      <PinkGalaxy />
    </ViewContainer>
  );
};

export default DashboardView;

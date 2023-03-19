import { createEffect, createResource, ErrorBoundary } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { Header } from "./Header";
import { AstronautDataBar } from "./AstronautDataBar";
import { MissionCards } from "./MissionCards";
import {
  getTestEndpoint,
  getUser,
  getMissions,
} from "../../utils/networkFunctions";

import { missions } from "../../../data/missions";

const ViewContainer = styled("div")`
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

const ServerData = styled("pre")`
  font-size: 2rem;
  color: var(--accent-teal);
`;

const DashboardView: Component = () => {
  const [testData] = createResource(getTestEndpoint);

  return (
    <ViewContainer>
      <HeaderContainer>
        <Header />
        <AstronautDataBar />
      </HeaderContainer>
      <MissionCards missions={missions} />
      <ErrorBoundary fallback={<ServerData>Error Getting Data</ServerData>}>
        <ServerData>
          {testData.state === "ready" ? testData()! : "Waiting For Data"}
        </ServerData>
      </ErrorBoundary>
    </ViewContainer>
  );
};

export default DashboardView;

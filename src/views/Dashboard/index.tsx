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
import type { MissionDoc } from "../../types";

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

const DashboardView: Component = () => {
  const [missionData] = createResource<MissionDoc[]>(getMissions);

  const activeMissions = () => {
    if (import.meta.env.DEV) {
      console.log("Missions are coming from local data");
      return missions;
    }

    if (missionData.state === "ready") {
      console.log("Missions are coming from the Missions Worker and KV");
      return missionData();
    }

    return [];
  };

  return (
    <ViewContainer>
      <HeaderContainer>
        <Header />
        <AstronautDataBar />
      </HeaderContainer>
      {missionData.loading ? "Loading" : null}
      <MissionCards missions={activeMissions()} />
    </ViewContainer>
  );
};

export default DashboardView;

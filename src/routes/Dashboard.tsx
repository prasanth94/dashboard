import React from "react"
import { Redirect } from "react-router-dom"

// Layout Types
import { IconSidebar } from "../layouts"

// Route Views
import { LogsView } from "../views/LogsView"
import TaskView from "../views/TaskView"
import Settings from "../views/Settings"
import HubView from "../views/HubView"
import PackageView from "../views/PackageView"
import LogIn from "../views/LogIn"

import NotFound from "../views/NotFound"
import NavigateButton from "../components/Common/NavigateButton"
import FlowView from "../views/FlowView"
import OAuthTestView from "../views/OAuthTestView"

export const dashboardRoutes = [
  {
    path: "/",
    exact: true,
    layout: IconSidebar,
    component: () => <Redirect to="/logs" />,
  },
  {
    path: "/oAuth",
    exact: true,
    layout: IconSidebar,
    component: OAuthTestView,
  },
  {
    path: "/logs",
    layout: IconSidebar,
    component: LogsView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/flow",
    layout: IconSidebar,
    component: FlowView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/task",
    layout: IconSidebar,
    component: TaskView,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/settings",
    layout: IconSidebar,
    component: Settings,
    props: {
      usesConnection: true,
      usesAuth: false,
    },
  },
  {
    path: "/help",
    layout: IconSidebar,
    component: NotFound,
    props: {
      usesConnection: false,
      usesAuth: false,
    },
  },
  {
    path: "/home",
    layout: IconSidebar,
    component: NotFound,
    props: {
      usesConnection: false,
      usesAuth: false,
    },
  },
  {
    path: "/hub",
    layout: IconSidebar,
    component: HubView,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
  {
    path: "/package/:packageId",
    layout: IconSidebar,
    component: PackageView,
    props: {
      navigateButton: () => (
        <NavigateButton label={"❮  Back"} path={"/hub/explore"} />
      ),
    },
  },
  {
    path: "/login",
    layout: IconSidebar,
    component: LogIn,
    props: {
      usesConnection: false,
      usesAuth: true,
    },
  },
]

import React from "react";
import LoginPage from "./page/loginPage/LoginPage";
import NotFoundPage from "./page/notFoundPage/NotFoundPage";
import PersonalPage from "./page/personalPage/PersonalPage";
import Index from "./page/indexPage/IndexPage";

const routers = [
  {
    path: "/",
    exact: true,
    main: ({ history }) => <Index history={history} />,
  },
  {
    path: "/login",
    exact: true,
    main: ({ history }) => <LoginPage history={history} />,
  },
  {
    path: "/personal/:username",
    exact: true,
    main: ({ history }) => <PersonalPage history={history} />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFoundPage />,
  },
];

export default routers;

import React from "react";

import Header from "../components/Sitewide/Header/Header";
import FullScreenHero from "../components/LandingPage/FullScreenHero";
import "../styles/tm.scss";

export const HomePage = (args) => {
  const [user, setUser] = React.useState();

  return (
    <>
      {/* <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      /> */}
      <Header isLoggedIn={args.isLoggedIn}></Header>
      <FullScreenHero></FullScreenHero>
    </>
  );
};
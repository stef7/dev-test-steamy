import { Heading } from "@chakra-ui/react";

import { GamesList } from "@/components/GamesList";

const HomePage = () => {
  return (
    <>
      <Heading>My Games</Heading>
      <GamesList />
    </>
  );
};

export default HomePage;

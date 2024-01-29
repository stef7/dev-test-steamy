import { Heading, Stack } from "@chakra-ui/react";

import { GamesList } from "@/components/GamesList";

const HomePage = () => {
  return (
    <Stack spacing={6} padding="5vw">
      <Heading>My Games</Heading>
      <GamesList />
    </Stack>
  );
};

export default HomePage;

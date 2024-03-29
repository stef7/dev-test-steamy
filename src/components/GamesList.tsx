import { ChangeEvent, FormEvent, Fragment, useState, useCallback, useRef, useMemo } from "react";
import { useDebounce, useLocalStorage } from "react-use";
import useSWR from "swr/immutable";

import { GetGamesResponse } from "@/pages/api/games/[steamId]";
import { defaultFetcher } from "@/util/apis";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Progress,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";

/**
 * Steam user ID length is 17 per: https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC#:~:text=refers%20to%20a%20unique%20identifier,is%20a%2017%20digit%20number
 */
const USER_ID_REGEX = /^\d{17}$/;

export const GamesList: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [value = "", setValue] = useLocalStorage("steam-user-id-value", "");
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value),
    [setValue],
  );

  const [userId, setUserId] = useState("");
  const onSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault(); // if no event, is called by debounced value update
      setUserId(USER_ID_REGEX.test(value) ? value : "");
    },
    [value],
  );
  useDebounce(onSubmit, 300, [onSubmit]);

  const { data, isLoading, error } = useSWR<GetGamesResponse>(userId && `/api/games/${userId}`, defaultFetcher);

  const result = useMemo(() => {
    if (error) return <Text>Error loading data</Text>;
    if (isLoading) return <Spinner size="lg" />;
    if (!data) return;
    return (
      <>
        <StatGroup>
          <Stat>
            <StatLabel>Games played</StatLabel>
            <StatNumber>{data.totalCount}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Hours played</StatLabel>
            <StatNumber>{data.totalHours.toFixed(1)}</StatNumber>
          </Stat>
        </StatGroup>

        <Stat>
          <StatLabel marginBottom={2}>Most played games</StatLabel>
          <Grid gap={5} autoColumns="fit-content(2rem) auto auto">
            {data.gamesMostPlayed.map(({ id, name, hours }, index) => (
              <Fragment key={id}>
                <GridItem colStart={1} rowSpan={2} justifySelf="end">
                  <Text fontSize="2xl" lineHeight={1.2}>
                    {index + 1}
                  </Text>
                </GridItem>
                <GridItem colStart={2}>{name} </GridItem>
                <GridItem justifySelf="end" colStart={3}>
                  {hours.toFixed(1)}
                </GridItem>
                <GridItem colStart={2} colSpan={2} marginTop={-3}>
                  <Progress value={(hours / Math.max(data.gamesMostPlayed[0].hours, 1)) * 100} />
                </GridItem>
              </Fragment>
            ))}
          </Grid>
        </Stat>
      </>
    );
  }, [error, data, isLoading]);

  return (
    <Stack spacing={6}>
      <form onSubmit={onSubmit} ref={formRef}>
        <FormControl>
          <FormLabel>Steam User ID</FormLabel>
          <Input value={value} onChange={onChange} type="number" />
        </FormControl>
      </form>

      {result}
    </Stack>
  );
};

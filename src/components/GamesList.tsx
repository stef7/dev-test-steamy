import { ChangeEvent, FormEvent, useState, useCallback, useId } from "react";
import { useDebounce, useAsync } from "react-use";
import useSWR from "swr";

import { GetGamesResponse } from "@/pages/api/games/[steamId]";

export const GamesList: React.FC = () => {
  const htmlId = useId();

  const [value, setValue] = useState("");
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value), []);

  const [userId, setUserId] = useState(value);
  const onSubmit = useCallback(
    (event?: FormEvent) => {
      setUserId(value);
      event?.preventDefault();
    },
    [value],
  );
  useDebounce(onSubmit, 300, [onSubmit]);

  const { data, isLoading, error } = useSWR<GetGamesResponse>(`/api/games/${userId}`);

  return (
    <section>
      <form onSubmit={onSubmit}>
        <label htmlFor={htmlId}>Stream User ID:</label>
        <input id={htmlId} value={value} onChange={onChange} type="text" />
        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data.</p>
      ) : (
        data && (
          <dl>
            <dt>Total # games</dt>
            <dd>{data.totalCount}</dd>
            <dt>Total hours played</dt>
            <dd>{data.totalHours}</dd>
            <dt>Most played games</dt>
            <dd>
              <ol>
                {data.gamesMostPlayed.map(({ id, name, hours }) => (
                  <li key={id} data-hours={hours}>
                    <span>{name} </span>
                    <span className="sr-only">: </span>
                    <span>{hours}</span>
                  </li>
                ))}
                <li></li>
              </ol>
            </dd>
          </dl>
        )
      )}
    </section>
  );
};

import useSWR from "swr";
import Flex from "../Layout/Flex";
import Grid from "../Layout/Grid";
import PlayerCard from "../PlayerCard";
import ActionLink from "../Layout/ActionLink";
import Loader from "@/components/Layout/Loader";

export default function Players({ limit = 20 }) {
  const { data: players, isLoading } = useSWR(
    `/api/players?${new URLSearchParams({ limit })}`
  );

  if (!players || isLoading) {
    return <Loader />;
  }

  return (
    <Flex gap="2rem" direction="column">
      <Grid gap="2rem">
        {players.length
          ? players.map((player) => (
              <PlayerCard
                key={player._id}
                {...player}
                actions={
                  <ActionLink href={`/players/${player._id}`}>
                    Read More
                  </ActionLink>
                }
              />
            ))
          : "No services yet."}
      </Grid>
    </Flex>
  );
}

import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Flex from "@/components/Layout/Flex";
import Column from "@/components/Layout/Column";
import Cover from "@/components/Layout/Cover";
import Avatar from "@/components/Layout/Avatar";
import Card from "@/components/Layout/Card";
import Loader from "@/components/Layout/Loader";
import ActionButton from "@/components/Layout/ActionButton";
import ReactMarkdown from "react-markdown";

const StyledMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  > * {
    margin: 0;
  }
  & p,
  & ul {
    line-height: 1.616;
  }
  & ul {
    padding: 0 1rem;
  }
`;

export default function PlayerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: player, error } = useSWR(`/api/players/${id}`);

  if (error) return <div>Error loading assessment</div>;
  if (!player) return <div>Loading...</div>;

  async function deletePlayer() {
    await fetch(`/api/players/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  const { name, club, offense, image, defense, technique } = player;

  return (
    <Column width="700px" padding="1rem">
      <Card padding="2rem" direction="column" gap="2rem">
        <Flex as="header" direction="column" gap="1.5rem">
          <Flex as="h1" justifyContent="space-between" flex={1}>
            <span>{name}</span>
            <span>{club}</span>
          </Flex>
          <Cover width={700} alt={name} src={image} />
          <Flex alignItems="center" gap="0.5rem" pushLast>
            Offered by
            <Avatar
              src={`https://dummyimage.com/75x75/48cae4/fff&text=${name}`}
              size={40}
            />
            <strong>{name}</strong>
          </Flex>
        </Flex>
        <h2>Player Details</h2>
        <Flex>
          <b>Offense:</b> {offense}
        </Flex>
        <Flex>
          <b>Defense:</b> {defense}
        </Flex>
        <Flex>
          <b>Technique:</b> {technique}
        </Flex>
      </Card>
    </Column>
  );
}

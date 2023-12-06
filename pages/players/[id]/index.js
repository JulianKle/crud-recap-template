import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Flex from "@/components/Layout/Flex";
import Column from "@/components/Layout/Column";
import Cover from "@/components/Layout/Cover";
import Avatar from "@/components/Layout/Avatar";
import Card from "@/components/Layout/Card";
import ReactMarkdown from "react-markdown";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";

import Link from "next/link.js";

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
  const {
    data: player,
    error,
    mutate,
  } = useSWR(id ? `/api/players/${id}` : null);
  const [localFavorite, setLocalFavorite] = useState(player?.favorite || false);

  if (error) return <div>Error loading player</div>;
  if (!player) return <div>Loading...</div>;

  async function handleFavoriteClick() {
    console.log("Before update - localFavorite:", localFavorite);
    console.log("Before update - player:", player);

    const response = await fetch(`/api/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: !localFavorite, ...player }),
    });

    console.log("After update - localFavorite:", !localFavorite);
    console.log("After update - player:", player);

    if (response.ok) {
      setLocalFavorite(!localFavorite);
      mutate(`/api/players/${id}`);
      console.log("toggled succesful");
    }
  }

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
      <FavoriteButton
        isFavorite={player?.favorite}
        onClick={handleFavoriteClick}
      />
      <Link href={`/players/${id}/edit`}>Edit</Link>
      <button onClick={deletePlayer}>delete</button>
    </Column>
  );
}

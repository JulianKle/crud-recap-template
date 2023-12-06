import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import ServiceForm from "../components/Forms/ServiceForm/index.js";
import styled from "styled-components";

const EditContainer = styled.div`
  padding: 20px;
  background-color: #282c34;
  color: #61dafb;
  position: relative; // Hinzugefügt
`;

const EditTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px; // Hinzugefügt
`;

const StyledLink = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  font-size: 18px;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #38a169;
    text-decoration: underline;
  }
`;

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { data: player, isLoading, error, mutate } = useSWR(`/api/players/`);

  async function createPlayer(formData) {
    const response = await fetch(`/api/players/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
      mutate();
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <EditContainer>
      <EditTitle id="edit-player">Edit Player</EditTitle>
      <Link href={`/`} passHref legacyBehavior>
        <StyledLink>Back</StyledLink>
      </Link>
      <ServiceForm onSubmit={createPlayer} formName={"edit-player"} />
    </EditContainer>
  );
}

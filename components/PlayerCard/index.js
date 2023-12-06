import Card from "../Layout/Card";
import Cover from "../Layout/Cover";
import Avatar from "../Layout/Avatar";
import Flex from "../Layout/Flex";
import Link from "next/link";

export default function PlayerCard({
  _id,
  name,
  club,
  offense,
  image,
  defense,
  technique,
}) {
  return (
    <Card gap="1rem">
      <Flex as="h3" justifyContent="space-between">
        {name} <span>{club}</span>
      </Flex>
      <Link href={`/players/${_id}`}>
        <Cover alt={name} src={image} />
      </Link>
      <Flex alignItems="center" gap="0.5rem" pushLast>
        <Avatar
          src={`https://dummyimage.com/75x75/48cae4/fff&text=${name}`}
          size={40}
        />
        <Flex>
          <b>Offense:</b> {offense}
        </Flex>
        <Flex>
          <b>Defense:</b> {defense}
        </Flex>
        <Flex>
          <b>Technique:</b> {technique}
        </Flex>
      </Flex>
    </Card>
  );
}

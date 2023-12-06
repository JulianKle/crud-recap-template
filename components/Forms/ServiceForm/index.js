import Form from "@/components/Layout/Form";
import ActionButton from "@/components/Layout/ActionButton";

export default function ServiceForm({ player = {}, onSubmit }) {
  function _onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    onSubmit(data);
  }
  return (
    <Form as="form" direction="column" onSubmit={_onSubmit}>
      <label>
        Name
        <input
          name="name"
          defaultValue={player.name}
          placeholder="Enter the player name"
          required
          autoFocus
        />
      </label>
      <label>
        Club
        <input
          name="club"
          defaultValue={player.club}
          placeholder="Enter the club name"
          required
        />
      </label>
      <label>
        Offense
        <input
          name="offense"
          defaultValue={player.offense}
          placeholder="Enter the offensive performance"
        />
      </label>
      <label>
        Image
        <input
          name="image"
          defaultValue={player.image}
          placeholder="Enter the player image"
        />
      </label>
      <label>
        Defense
        <input
          name="defense"
          defaultValue={player.defense}
          placeholder="Enter the defensive performance"
        />
      </label>
      <label>
        Technique
        <input
          name="technique"
          defaultValue={player.technique}
          placeholder="Enter the technical skills"
        />
      </label>
      <button type="submit">Save</button>
    </Form>
  );
}

import Player from "../../../db/models/Players.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  const { id } = request.query;
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

  if (request.method === "GET") {
    try {
      const players = await Player.findById(id);
      response.status(200).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PUT") {
    const updatedPlayer = request.body;
    await Player.findByIdAndUpdate(id, updatedPlayer);

    // Find the Player by its ID and update the content that is part of the request body!
    response.status(200).json({ status: `Player successfully updated.` });
    // If successful, you'll receive an OK status code.
  }

  if (request.method === "DELETE") {
    await Player.findByIdAndDelete(id);
    // Declare playerToDelete to be the player identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json({ status: `Player ${id} successfully deleted.` });
  }
}

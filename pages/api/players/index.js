import Player from "../../../db/models/Players.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

  if (request.method === "GET") {
    try {
      const players = await Player.find();
      console.log("Players", players);
      response.status(200).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "POST") {
    try {
      const playerData = request.body;
      await Player.create(playerData);
      response.status(201).json({ status: "Player created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}

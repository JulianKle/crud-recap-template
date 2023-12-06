import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  club: { type: String, required: false },
  offense: { type: String, required: false },
  image: { type: String, required: false },
  defense: { type: String, required: false },
  technique: { type: String, required: false },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;

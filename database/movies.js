import mongoose from "mongoose";

//create movies schema
const MoviesSchema = mongoose.Schema({
    image: String,
    title: String,
    actor: String,
    id :Number,
    Votes:String,
    likes:String
});

export const MoviesModel = mongoose.model("movies", MoviesSchema);


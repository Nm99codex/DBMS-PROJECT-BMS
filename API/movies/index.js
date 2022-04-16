// Libraties
import express from "express";

// Database modal
import {MoviesModel} from "../../database/allModels";

const app = express.Router();

/*
Route            /movies
Description      Get all the movies
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
// http://localhost:5000/movies
app.get("/", async (req, res) => {
    const getAllMovies = await MoviesModel.find();
    console.log(MoviesModel)
    return res.json(getAllMovies);
});


// app.get('/:id' , async(req,res) => {
//     let {id} = req.params;
//     id = Number(id);
//     const getspecificMovie = await MoviesModel.findOne({id:id});
//     if(getspecificMovie.length===null)
//     {
//         return res.json({"error" : `No Movie for the id of ${id}`})
//     }
//     return res.json(getspecificMovie);
// })

app.get('/movie/:id' , async(req,res) => {
    let {id} = req.params;
    const getspecificMovie = await MoviesModel.findOne({_id:id});
    if(getspecificMovie.length===null)
    {
        return res.json({"error" : `No Movie for the id of ${id}`})
    }
    return res.json(getspecificMovie);
})

export default app;

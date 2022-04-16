app.get('/movies/:id' , async (req,res) => {
//     let {id} = req.params;
//     id = Number(id);
//     const getSpecificMovie = await MovieModel.filter((movies) => movies.id === id)
//     if(getSpecificMovie.length === 0)
//     {
//         return res.json({"error" : `No movies for the id of ${id}`})
//     }
//     return res.json(getSpecificMovie);
// })
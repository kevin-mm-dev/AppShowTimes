import { Router } from "express";
import Movie from "../models/Movies";
import path from "path";
import fs from "fs-extra";

import upload from "../libs/storage";

const router = Router();

router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  console.log("movies:", movies);
  res.json(movies);
});

router.post("/movies", upload.single("imageMovie"), async (req, res) => {

  try {
      console.log('req',req.file);
      const imgPath=req.file?req.file.path:'';
      const { title, description } = req.body;
    if (req.file && title && description ) {
      const movie = new Movie({
        title:title,
        description:description,
        imgPath: imgPath,
      });
      await movie.save();
      // res.json(movie);
      return res.status(201).json({ message: "successfully created",movie });

    } else {
      return res.status(400).json({ message: "No image sent" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    //TODO: validate the ID
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    //TODO: validate the ID
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (movie.imgPath) {
      await fs.unlink(path.resolve(movie.imgPath));
    }
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/movies/:id",upload.single("imageMovie"), async (req, res) => {
  try {
    //TODO: validate the ID
    const movie = await Movie.findById(req.params.id);
    
    if (req.file) {
      if (movie.imgPath) {
        await fs.unlink(path.resolve(movie.imgPath));
      }
    }
    const imgPath=req.file?req.file.path:movie.imgPath;
    const { title, description } = req.body;
    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      {title, description,imgPath},
      { new: true }
    );
    if (!movieUpdated) {
      return res.status(404).json({ message: "movie not found" });
    }
    return res.status(201).json({ message: "successfully created"});
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;

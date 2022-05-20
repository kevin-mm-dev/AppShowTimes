import axios from './axios'
import {Movie} from '../interfaces/movie'
import { AxiosResponse } from "axios";

export const CreateMovie=async (movie: FormData): Promise<AxiosResponse> =>
  await axios.post("/movies", movie);

export const GetMovies = async (): Promise<AxiosResponse<Movie[]>> =>
  await axios.get("/movies");

export const GetMovie = async (id: string): Promise<AxiosResponse<Movie>> =>
  await axios.get(`/movies/${id}`);

export const UpdateMovie = async (
  id: string,
  newMovie: FormData
): Promise<AxiosResponse<Movie>> => await axios.put(`/movies/${id}`, newMovie);

export const DeleteMovie = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/movies/${id}`);
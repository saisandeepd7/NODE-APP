import { client } from "../index.js";

export async function editmovie(id, data) {
    return await client.db("NODE-APP").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deletemovie(id) {
    return await client.db("NODE-APP").collection("movies").deleteOne({ id: id });
}
export async function addmovie(data) {
    return await client.db("NODE-APP").collection("movies").insertMany(data);
}
export async function getmoviebyid(id) {
    return await client.db("NODE-APP").collection("movies").findOne({ id: id });
}
export async function getallmovies(req) {
    return await client.db("NODE-APP").collection("movies").find(req.query).toArray();
}

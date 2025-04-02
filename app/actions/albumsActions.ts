import { AlbumType } from "../lib/types/albumTypes"
import { z } from "zod";
import { SongSchema } from "./songActions";

// const mongo_url = process.env.MONGO_URL
const apiURL = process.env.MONGO_URL

const AlbumSchema = z.object({
  albumName: z.coerce
    .string()
    .optional()
    .nullable(),
  
  artistId: z.coerce.string().nonempty(),

  songs: z.array(SongSchema)
});

export type AlbumFormState = {
  errors?: {
    name?: string[];
    albumName?: string[];
    songs?: string[]
  };
  message?: string | null;
};

type ArtistFetchData = {
  name: string
  artistName: string
  albums: string[]
  songs: string[]
}

// GET ALBUM REQ FN 

export const fetchAlbumsByArtistId = async(artistId: string):Promise<AlbumType[] | undefined> => {

  const requestUrl = `${apiURL}/albums/${artistId}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch artist albums: ', error)
    return undefined
  }
}

// POST FNS FOR ALBUM

export const createAlbum = async(prevState: AlbumFormState, formData: FormData) => {
  console.log('running create album')
  const validatedFields = AlbumSchema.safeParse({
    albumName: formData.get('albumName'),
    artistId: formData.get('artistId'),
    songs: formData.get('songs')
  })
}
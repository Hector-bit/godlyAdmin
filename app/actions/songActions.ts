'use server'
import { z } from "zod";
import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const mongo_url = process.env.MONGO_URL

const SongSchema = z.object({
  songName: z.coerce.string().nonempty(),
  artistId: z.coerce.string().nonempty(),
  albumId: z.coerce.string().nonempty()
  // songs: z.array(SongSchema)
});


export type SongFormState = {
  errors?: {
    songName?: string[];
    artistId?: string[];
    albumId?: string[]
  };
  message?: string | null;
};


// GET SONGS FNS

export const fetchSongs = async(albumId?: string, artistId?: string) => {
  const requestUrl = `${mongo_url}/songs${albumId?`?albumId=${albumId}`:''}${artistId?`?artistId=${artistId}`:''}`

  console.log('req url fron song fetch:', requestUrl, ' end')

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch songs by album id: ', error)
    return undefined
  }
}

export const fetchSongsByArtistId = async(artistId: string):Promise<ArtistType | undefined> => {

  const requestUrl = `${mongo_url}/songs/${artistId}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch artist songs: ', error)
    return undefined
  }
}

// POST SONG FNS 

export const postCreateSong = async(prevState: SongFormState, formData: FormData) => {
    console.log('running create album to: ', mongo_url)
  
    const validatedFields = SongSchema.safeParse({
      songName: formData.get('songName'),
      albumId: formData.get('albumId'),
      artistId: formData.get('artistId'),

    })
  
    // console.log('fields: ', validatedFields.success, validatedFields)
  
    if(!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. failed to create song'
      }
    }
  
    const { songName, albumId, artistId } = validatedFields.data
  
    const songPostBody = {
      "songName": songName,
      "albumId": albumId,
      "artistId": artistId,

    }
  
    const requestUrl = `${mongo_url}/songs`
    // console.log('request url: ', requestUrl)
  
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify(songPostBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      // console.log('MY RESPONSE', response)
  
      const responseData = await response.json()
  
      console.log('create song post data: ', responseData)
    } catch(error) {
      console.error('could not create song: ', error)
    }
  
    revalidatePath(`/artists/${artistId}/album-manager/${albumId}`)
    redirect(`/artists/${artistId}/album-manager/${albumId}`)
}

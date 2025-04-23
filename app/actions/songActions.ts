'use server'
import { z } from "zod";
import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SongType } from "../lib/types/songTypes";


const mongo_url = process.env.MONGO_URL

const SongSchema = z.object({
  songName: z.coerce.string().nonempty(),
  artistId: z.coerce.string().nonempty(),
  albumId: z.coerce.string().optional(),
  youtubeLink: z.coerce.string().optional(),
  spotifyLink: z.coerce.string().optional(),
  soundCloudLink: z.coerce.string().optional()
  // songs: z.array(SongSchema)
});

const UpdateSongSchema = z.object({
  songId: z.coerce.string().nonempty(),
  songName: z.coerce.string().optional(),
  artistId: z.coerce.string().optional(),
  albumId: z.coerce.string().optional(),
  youtubeLink: z.coerce.string().optional(),
  spotifyLink: z.coerce.string().optional(),
  soundCloudLink: z.coerce.string().optional()
  // songs: z.array(SongSchema)
});


export type SongFormState = {
  errors?: {
    songName?: string[];
    artistId?: string[];
    albumId?: string[];
    youtubeLink?: string[];
    spotifyLink?: string[];
    soundCloudLink?: string[];
  };
  message?: string | null;
};


// GET SONGS FNS

export const fetchSongs = async(albumId?: string, artistId?: string):Promise<SongType[] | undefined> => {
  const requestUrl = `${mongo_url}/songs${albumId?`?albumId=${albumId}`:''}${artistId?`&?artistId=${artistId}`:''}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
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
    return data
  } catch(error) {
    console.error('could not fetch artist songs: ', error)
    return undefined
  }
}

export const fetchSongBySongId = async(songId: string):Promise<SongType | undefined> => {
  const requestUrl = `${mongo_url}/songs/${songId}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    return data
  } catch(error) {
    console.error('could not fetch artist songs: ', error)
    return undefined
  }
}

// TODO: GET RID OF THIS OR REPLACE 
export const fetchSinglesByArtistId = async(artistId: string):Promise<SongType[] | undefined> => {

  const requestUrl = `${mongo_url}/songs?artistId=${artistId}&isSingle=true`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    return data
  } catch(error) {
    console.error('could not fetch artist songs: ', error)
    return undefined
  }
}

// POST SONG FNS 

export const postCreateSong = async(prevState: SongFormState, formData: FormData) => {
  
    const validatedFields = SongSchema.safeParse({
      songName: formData.get('songName'),
      albumId: formData.get('albumId'),
      artistId: formData.get('artistId'),
      youtubeLink: formData.get('youtubeLink'),
      spotifyLink: formData.get('spotifyLink'),
      soundCloudLink: formData.get('soundCloudLink'),

    })

    if(!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. failed to create song'
      }
    }
  
    const { songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink } = validatedFields.data
  
    const songPostBody = {
      "songName": songName,
      "albumId": albumId,
      "artistId": artistId,
      "youtubeLink": youtubeLink,
      "spotifyLink": spotifyLink,
      "soundCloudLink": soundCloudLink,
    }
  
    const requestUrl = `${mongo_url}/songs`
  
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify(songPostBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      await response.json()
  
    } catch(error) {
      console.error('could not create song: ', error)
    }
  
    revalidatePath(`/artists/${artistId}/album-manager/${albumId}`)
    redirect(`/artists/${artistId}/album-manager/${albumId}`)
}

export const postCreateSingle = async(prevState: SongFormState, formData: FormData) => {

  const validatedFields = SongSchema.safeParse({
    songName: formData.get('songName'),
    // albumId: formData.get('albumId'),
    artistId: formData.get('artistId'),
    youtubeLink: formData.get('youtubeLink'),
    spotifyLink: formData.get('spotifyLink'),
    soundCloudLink: formData.get('soundCloudLink'),
  })

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. failed to create song'
    }
  }

  const { songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink } = validatedFields.data

  const songPostBody = {
    "songName": songName,
    "albumId": albumId,
    "artistId": artistId,
    "youtubeLink": youtubeLink,
    "spotifyLink": spotifyLink,
    "soundCloudLink": soundCloudLink,
  }

  const requestUrl = `${mongo_url}/songs`

  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      body: JSON.stringify(songPostBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await response.json()

  } catch(error) {
    console.error('could not create song: ', error)
  }

  revalidatePath(`/artists/${artistId}`)
  redirect(`/artists/${artistId}`)
}

// UPDATE SONG FNS
export const updateSingle = async(prevState: SongFormState, formData: FormData) => {

  const validatedFields = UpdateSongSchema.safeParse({
    songId: formData.get('songId'),
    songName: formData.get('songName'),
    // albumId: formData.get('albumId'),
    artistId: formData.get('artistId'),
    youtubeLink: formData.get('youtubeLink'),
    spotifyLink: formData.get('spotifyLink'),
    soundCloudLink: formData.get('soundCloudLink'),
  })

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. failed to create song'
    }
  }

  const { songId, songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink } = validatedFields.data

  type songPostType = {
    songName: string | undefined
    albumId: string | undefined
    artistId: string | undefined
    youtubeLink: string | undefined
    spotifyLink: string | undefined
    soundCloudLink: string | undefined
  }

  const songPostBody:songPostType = {
    songName: undefined,
    albumId: undefined,
    artistId: undefined,
    youtubeLink: undefined,
    spotifyLink: undefined,
    soundCloudLink: undefined
  }

  if(songName !== ''){songPostBody.songName = songName}
  if(albumId !== ''){songPostBody.albumId = songName}
  if(artistId !== ''){songPostBody.artistId = artistId}
  if(youtubeLink !== ''){songPostBody.youtubeLink = youtubeLink}
  if(spotifyLink !== ''){songPostBody.spotifyLink = spotifyLink}
  if(soundCloudLink !== ''){songPostBody.soundCloudLink = soundCloudLink}

  console.log('post body: ', songPostBody, console)

  const requestUrl = `${mongo_url}/songs/${songId}`

  try {
    const response = await fetch(requestUrl, {
      method: "PUT",
      body: JSON.stringify(songPostBody),
      headers: {
        "Content-Type": "application/json",
      },
    })


    await response.json()

    // console.log('update song data: ', responseData)
  } catch(error) {
    console.error('could not update song: ', error)
  }

  revalidatePath(`/artists/${artistId}`)
  redirect(`/artists/${artistId}`)
}



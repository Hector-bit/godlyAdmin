'use server'
import { z } from "zod";
import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SongType } from "../lib/types/songTypes";


const mongo_url = process.env.MONGO_URL

const SongSchema = z.object({
  _id: z.coerce.string().optional(),
  songName: z.coerce.string().nonempty(),
  artistId: z.coerce.string().nonempty(),
  albumId: z.coerce.string().optional(),
  img: z.coerce.string().optional(),
  youtubeLink: z.coerce.string().optional(),
  spotifyLink: z.coerce.string().optional(),
  soundCloudLink: z.coerce.string().optional()
  // songs: z.array(SongSchema)
});


export type SongFormState = {
  errors?: {
    songName?: string[];
    img?: string[];
    artistId?: string[];
    albumId?: string[];
    youtubeLink?: string[];
    spotifyLink?: string[];
    soundCloudLink?: string[];
  };
  message?: string | null;
};


// >>------> GET FNS FOR SONGS/SINGLES <------<<
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

// >>------> UPDATE FNS FOR SONGS <------<<

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

// >>------> POST FNS FOR SINGLES <------<<
export const postCreateSingle = async(prevState: SongFormState, formData: FormData) => {

  const validatedFields = SongSchema.safeParse({
    songName: formData.get('songName'),
    img: formData.get('img'),
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

  const { songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink, img } = validatedFields.data

  const songPostBody = {
    "songName": songName,
    "img": img,
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

// >>------> UPDATE FNS FOR SONGS/SINGLES <------<<
export const updateSingle = async(prevState: SongFormState, formData: FormData) => {

  const validatedFields = SongSchema.safeParse({
    _id: formData.get('_id'),
    songName: formData.get('songName'),
    // albumId: formData.get('albumId'),
    img: formData.get('img'),
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

  const { _id, songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink, img } = validatedFields.data

  type songPostType = {
    songName: string | undefined
    albumId: string | undefined
    img: string | undefined
    artistId: string | undefined
    youtubeLink: string | undefined
    spotifyLink: string | undefined
    soundCloudLink: string | undefined
  }

  const songPostBody:songPostType = {
    songName: undefined,
    albumId: undefined,
    img: undefined,
    artistId: undefined,
    youtubeLink: undefined,
    spotifyLink: undefined,
    soundCloudLink: undefined
  }

  if(songName !== ''){songPostBody.songName = songName}
  if(albumId !== ''){songPostBody.albumId = songName}
  if(img !== '')(songPostBody.img = img)
  if(artistId !== ''){songPostBody.artistId = artistId}
  if(youtubeLink !== ''){songPostBody.youtubeLink = youtubeLink}
  if(spotifyLink !== ''){songPostBody.spotifyLink = spotifyLink}
  if(soundCloudLink !== ''){songPostBody.soundCloudLink = soundCloudLink}

  console.log('post body: ', songPostBody, console)

  const requestUrl = `${mongo_url}/songs/${_id}`

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


// >>------> DELETE FNS FOR SONGS/SINGLES <------<<
export const deleteSong = async(songId: string, artistId: string, albumId: string):Promise<void> => {
  try {
    await fetch(`${mongo_url}/songs/${songId}`,
      {
        method: 'DELETE'
      }
    )

    // const data = await response.json()
    // console.log('artist delete data', data)
  }
  catch(error) {
    console.error('Could not delete event', error)
    //TODO: THROW HTTP ERROR INSTEAD
    return
  }

  revalidatePath(`/artists/${artistId}/album-manager/${albumId}`)
  redirect(`/artists/${artistId}/album-manager/${albumId}`)
}

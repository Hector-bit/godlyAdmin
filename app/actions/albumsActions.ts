'use server'
import { AlbumType } from "../lib/types/albumTypes"
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const mongo_url = process.env.MONGO_URL

const AlbumSchema = z.object({
  albumName: z.coerce.string().nonempty(),
  
  artistId: z.coerce.string().nonempty(),

  // songs: z.array(SongSchema)
});

export type AlbumFormState = {
  errors?: {
    albumName?: string[];
    artistId?: string[];
    // songs?: string[]
  };
  message?: string | null;
};

// GET ALBUM FNS

export const fetchSongsByAlbumId = async(albumId: string) => {
  const requestUrl = `${mongo_url}/albums/${albumId}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch album: ', error)
    return undefined
  }
}

// export const fetchAlbumsByArtistId = async(artistId: string):Promise<AlbumType[] | undefined> => {
//   const requestUrl = `${mongo_url}/albums/${artistId}`

//   try{
//     const response = await fetch(requestUrl)
//     const data = await response.json()
//     // console.log('artist data: ', data)
//     return data
//   } catch(error) {
//     console.error('could not fetch artist albums: ', error)
//     return undefined
//   }
// }

export const fetchAlbumByAlbumId = async(albumId: string):Promise<AlbumType | undefined> => {
  const requestUrl = `${mongo_url}/albums/${albumId}`

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

// >>------> POST FNS FOR ARTISTS <------<<

export const postCreateAlbum = async(prevState: AlbumFormState, formData: FormData) => {

  const validatedFields = AlbumSchema.safeParse({
    albumName: formData.get('albumName'),
    artistId: formData.get('artistId'),
    // songs: formData.get('songs')
  })

  // console.log('fields: ', validatedFields.success, validatedFields)

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. failed to create albun'
    }
  }

  const { albumName, artistId } = validatedFields.data

  const albumPostBody = {
    'albumName': albumName,
    'artistId': artistId
  }

  const requestUrl = `${mongo_url}/albums`
  // console.log('request url: ', requestUrl)

  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      body: JSON.stringify(albumPostBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    // console.log('MY RESPONSE', response)

    const responseData = await response.json()

    console.log('create album post data: ', responseData)
  } catch(error) {
    console.error('could not create album: ', error)
  }

  revalidatePath(`/artists/${artistId}`)
  redirect(`/artists/${artistId}`)
}

// >>------> DELETE FNS FOR ARTISTS <------<<

export const deleteAlbum = async(artistId: string, albumId: string) => {
    const requestUrl = `${mongo_url}/albums/${albumId}`

    try{
      await fetch(requestUrl, {
        method: 'DELETE'
      })
    } catch(error){
      console.error('error deleteing album: ', error)
      // TODO: THROW HTTP ERROR 
      return 
    }
  
  revalidatePath(`/artists/${artistId}`)
  redirect(`/artists/${artistId}`)
}
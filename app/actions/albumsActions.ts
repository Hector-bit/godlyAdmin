'use server'
import { AlbumType } from "../lib/types/albumTypes"
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const mongo_url = process.env.MONGO_URL

const AlbumSchema = z.object({
  //_id refers to album id
  _id: z.coerce.string().optional(),
  albumName: z.coerce.string().nonempty(),
  artistId: z.coerce.string().nonempty(),
  img: z.coerce.string().optional()
});

export type AlbumState = {
  errors?: {
    _id?: string[];
    albumName?: string[];
    artistId?: string[];
    img?: string[]
  };
  message?: string | null;
};

// >>------> GET FNS FOR ALBUMS <------<<

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

export const getAlbumByAlbumId = async(albumId: string):Promise<AlbumType | undefined> => {
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

export const postCreateAlbum = async(prevState: AlbumState, formData: FormData) => {

  const validatedFields = AlbumSchema.safeParse({
    albumName: formData.get('albumName'),
    artistId: formData.get('artistId'),
    img: formData.get('img')
  })

  // console.log('fields: ', validatedFields.success, validatedFields)

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. failed to create albun'
    }
  }

  const { albumName, artistId, img } = validatedFields.data

  const albumPostBody = {
    'albumName': albumName,
    'artistId': artistId,
    'img': img
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

// >>------> PATCH FNS FOR ARTISTS <------<<

export const patchAlbum = async(prevState: AlbumState, formData: FormData) => {
  const validatedFields = AlbumSchema.safeParse({
    _id: formData.get('_id'),
    albumName: formData.get('albumName'),
    artistId: formData.get('artistId'),
    img: formData.get('img')
  })

  // console.log('fields: ', validatedFields.success, validatedFields)

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. failed to create albun'
    }
  }

  const { _id, albumName, artistId, img } = validatedFields.data

  const albumPostBody = {
    'albumName': albumName,
    'artistId': artistId,
    'img': img
  }

  console.log('ALBUM PATCHING', albumPostBody)

  const requestUrl = `${mongo_url}/albums/${_id}`
  // console.log('request url: ', requestUrl)

  try {
    const response = await fetch(requestUrl, {
      method: "PATCH",
      body: JSON.stringify(albumPostBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    // console.log('MY RESPONSE', response)
    // const responseData = await response.json()
    await response.json()

    // console.log('create album post data: ', responseData)
  } catch(error) {
    console.error('could not create album: ', error)
  }

  revalidatePath(`/artists/${artistId}/album-manager/${_id}`)
  redirect(`/artists/${artistId}/album-manager/${_id}`)
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
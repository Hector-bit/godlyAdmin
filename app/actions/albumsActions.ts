import { AlbumType } from "../lib/types/albumTypes"
// import { z } from "zod";

// const mongo_url = process.env.MONGO_URL
const apiURL = process.env.MONGO_URL

// const FormSchema = z.object({
//   albumName: z.coerce
//     .string()
//     .optional()
//     .nullable(),
  
//   artistId: z.coerce.string().nonempty()
  
  
//   // status: z.enum(['pending', 'paid'], {
//   //   invalid_type_error: 'Please select an invoice status.',
//   // }),
//   // date: z.string(),
// });

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


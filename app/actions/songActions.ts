import { ArtistType } from "../lib/types/artistTypes"
// const mongo_url = process.env.MONGO_URL
const apiURL = process.env.MONGO_URL

export const fetchSongsByArtistId = async(artistId: string):Promise<ArtistType | undefined> => {

  const requestUrl = `${apiURL}/songs/${artistId}`

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

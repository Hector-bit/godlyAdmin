'use server'

import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"

const apiURL = process.env.MONGO_URL

// export const SongSchema = z.object({
//   songName: z.string(),
// })

// GET SONGS FNS

export const fetchSongs = async(albumId?: string, artistId?: string) => {
  const requestUrl = `${apiURL}/songs${albumId?`?albumId=${albumId}`:''}${artistId?`?artistId=${artistId}`:''}`

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

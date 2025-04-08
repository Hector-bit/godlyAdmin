import { AlbumType } from "./albumTypes"

export type ArtistType = {
  _id: string
  name: string
  artistName?: string
  albums: AlbumType[]
  __v: number
}



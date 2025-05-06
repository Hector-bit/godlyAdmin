import { SongType } from "./songTypes"

export type AlbumType = {
  _id: string
  albumName: string
  artistId: string
  albumSongs?: SongType[]
  img?: string
  __v: number
}


import { fetchArtists } from "../actions/artistActions";
import { ArtistType } from "../lib/types/artists";
import Link from "next/link";

const ArtistList = async() => {
  const artists = await fetchArtists()
  // console.log('our artists', artists)

  return (
    <div>
      <div>Godly Artists</div>
      <div className="grid grid-span-2 gap-3">
        {artists && artists.map((artist:ArtistType, index:number) => {
          return (
            <Link key={artist._id} href={`/artists/${artist._id}`}>
              <div className="flex flex-row justify-between p-3 border-2 border-black rounded-xl">
                <div className="flex flex-col">
                  <div>Name: {artist.name}</div>
                  <div>Artist Name: {artist.artistName}</div>
                </div>
              </div>
            
            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default ArtistList;


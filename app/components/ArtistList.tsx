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
        {artists.map((artist:ArtistType, index:number) => {
          return (
            <Link href={`/artists/${artist._id}`}>
              <div key={artist._id} className="flex flex-row justify-between p-2 border-2 border-white">
                <div className="flex flex-col">
                  <div>Name: {artist.name}</div>
                  {artist.artistName ?? <div>Artist Name: {artist.artistName}</div>}
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


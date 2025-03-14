import { fetchArtists } from "../actions/artistActions";
import { ArtistType } from "../lib/types/artists";

const ArtistList = async() => {
  const artists = await fetchArtists()
  // console.log('our artists', artists)

  return (
    <div>
      <div>Godly Artists</div>
      <div className="grid grid-span-2 gap-3">
        {artists.map((artist:ArtistType, index:number) => {
          return (
            <div key={artist._id} className="flex flex-col p-2 border-2 border-white">
              <div>Name: {artist.name}</div>
              {artist.artistName ?? <div>Artist Name: {artist.artistName}</div>}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default ArtistList;


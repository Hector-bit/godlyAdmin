import { fetchArtists } from "../actions/artistActions";
import { ArtistType } from "../lib/types/artistTypes";
import Link from "next/link";
import Image from "next/image";

const ArtistList = async() => {
  const artists = await fetchArtists()
  console.log('our artists', artists)

  return (
    <div className="grid grid-span-2 gap-3">
      {artists && artists.map((artist:ArtistType) => {
        const artistImage = artist?.img ? artist.img  : 'globe.svg'
        
        return (
          <Link key={artist._id} href={`/artists/${artist._id}`}>
            <div className="flex flex-row p-3 border-2 border-black rounded-xl gap-3">
              <Image src={artistImage} alt={"artist"} width={200} height={200}/>
              <div className="flex flex-col">
                <div>Name: {artist.name}</div>
                <div>Artist Name: {artist.artistName}</div>
              </div>
            </div>
          
          </Link>
        )
      })}

    </div>
  )
}

export default ArtistList;


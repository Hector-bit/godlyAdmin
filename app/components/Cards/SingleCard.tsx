import { SongType } from "@/app/lib/types/songTypes";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

export default function SingleCard(prop: {song: SongType}){
  const song = prop.song

  const songImg = song?.img ? song.img : 'globe.svg' 

  return (
    <div key={song._id} className="flex flex-row justify-between border border-black p-4 rounded-xl">
      <div className="flex flex-col">
        <div>Single: {song.songName}</div>
        <Image src={songImg} alt={"single cover"} width={50} height={50}/>
      </div>
      <Link href={`/artists/${song.artistId}/single-manager/${song._id}`}>
        <PencilSquareIcon className="w-[20px]"/>
      </Link>
    </div>
  )
}


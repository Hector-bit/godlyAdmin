import { SongType } from "@/app/lib/types/songTypes";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default function SingleCard(prop: {song: SongType}){
  const song = prop.song

  return (
    <div key={song._id} className="flex flex-row justify-between border border-black p-4 rounded-xl">
      <div>Single: {song.songName}</div>
      <Link href={`/artists/${song.artistId}/single-manager/${song._id}`}>
        <PencilSquareIcon className="w-[20px]"/>
      </Link>
    </div>
  )
}


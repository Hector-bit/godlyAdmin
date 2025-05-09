import Image from "next/image"
import Link from "next/link"
import { PencilSquareIcon } from "@heroicons/react/16/solid"
import { AlbumType } from "@/app/lib/types/albumTypes"

export default function AlbumCard(props: {album: AlbumType}) {

  const album = props.album
  const albumImg = album?.img ? album.img : 'globe.svg'

  return (
    <div key={album._id} className="flex flex-row justify-between border border-black p-4 rounded-xl">
    <div className="flex flex-col gap-3">
      <Image src={albumImg} alt={"album cover"} width={120} height={120}/>
      <div className="font-bold text-lg">{album.albumName}</div>
    </div>
    <Link href={`/artists/${album.artistId}/album-manager/${album._id}`}>
      <PencilSquareIcon className="w-[20px]"/>
    </Link>
    </div>
  )
}
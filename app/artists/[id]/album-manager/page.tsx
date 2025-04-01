import CreateAlbumForm from "@/app/components/forms/CreateAlbum"

export default async function AlbumPage(props: { params: Promise<{id: string}> }) {

  const params = await props.params
  console.log(params)

  return (
    <div>
      Albums 

      <CreateAlbumForm/>
    </div>
  )
}


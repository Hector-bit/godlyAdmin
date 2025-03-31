

export default async function AlbumPage(props: { params: Promise<{id: string}> }) {

  const params = await props.params

  return (
    <div>
      Albums 
    </div>
  )
}


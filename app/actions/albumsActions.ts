const mongo_url = process.env.MONGO_URL
const apiURL = process.env.MONGO_URL

export const fetchAlbumsByArtistId = async(artistId: string) => {

  const requestUrl = `${apiURL}/albums/${artistId}`

  try{
    const response = await fetch(requestUrl)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch artists: ', error)
    return undefined
  }
}


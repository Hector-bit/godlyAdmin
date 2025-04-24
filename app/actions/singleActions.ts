'use server'
// import { z } from "zod";
// import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const mongo_url = process.env.MONGO_URL

// >>------> DELETE FNS FOR SONGS/SINGLES <------<<
export const deleteSingle = async(songId: string, artistId: string):Promise<void> => {
  try {
    await fetch(`${mongo_url}/songs/${songId}`,
      {
        method: 'DELETE'
      }
    )
  }
  catch(error) {
    console.error('Could not delete event', error)
    //TODO: THROW HTTP ERROR INSTEAD
    return
  }

  revalidatePath(`/artists/${artistId}`)
  redirect(`/artists/${artistId}`)
}


'use server'
import { z } from "zod";
import { ArtistType } from "../lib/types/artistTypes"
// import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SongType } from "../lib/types/songTypes";


const mongo_url = process.env.MONGO_URL

const SingleSchema = z.object({
  singleId: z.coerce.string().optional(),
  songName: z.coerce.string().nonempty(),
  artistId: z.coerce.string().nonempty(),
  albumId: z.coerce.string().optional(),
  img: z.coerce.string().optional(),
  youtubeLink: z.coerce.string().optional(),
  spotifyLink: z.coerce.string().optional(),
  soundCloudLink: z.coerce.string().optional()
  // songs: z.array(SingleSchema)
});


export type SingleFormState = {
  errors?: {
    songName?: string[];
    img?: string[];
    artistId?: string[];
    albumId?: string[];
    youtubeLink?: string[];
    spotifyLink?: string[];
    soundCloudLink?: string[];
  };
  message?: string | null;
};


// >>------> PUT FNS FOR SINGLE <------<<

export const updateSingle = async(prevState: SingleFormState, formData: FormData) => {
  
    const validatedFields = SingleSchema.safeParse({
      singleId: formData.get('singleId'),
      songName: formData.get('songName'),
      artistId: formData.get('artistId'),
      youtubeLink: formData.get('youtubeLink'),
      spotifyLink: formData.get('spotifyLink'),
      soundCloudLink: formData.get('soundCloudLink'),

    })

    if(!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. failed to create song'
      }
    }
  
    const { singleId, songName, albumId, artistId, youtubeLink, spotifyLink, soundCloudLink } = validatedFields.data
  
    const songUpdateBody = {
      "singleId": singleId,
      "songName": songName,
      // "artistId": artistId, we don't need to update artistId here
      "youtubeLink": youtubeLink,
      "spotifyLink": spotifyLink,
      "soundCloudLink": soundCloudLink,
    }
  
    const requestUrl = `${mongo_url}/songs/${singleId}`
  
    try {
      const response = await fetch(requestUrl, {
        method: "PUT",
        body: JSON.stringify(songUpdateBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      await response.json()
  
    } catch(error) {
      console.error('could not create song: ', error)
    }
  
    revalidatePath(`/artists/${artistId}`)
    redirect(`/artists/${artistId}`)
}


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


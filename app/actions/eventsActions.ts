'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';
import { ArtistType } from '../lib/types/artistTypes';
import { redirect } from "next/navigation";

const mongo_url = process.env.MONGO_URL

const FormSchema = z.object({
  title: z.string({
    invalid_type_error: 'Please enter event title',
  }),
  description: z.string().optional(),
  link: z.string().optional()
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  // date: z.string(),
});

export type State = {
  errors?: {
    name?: string[];
    artistName?: string[];
  };
  message?: string | null;
};

// >>------> GET FNS FOR ARTISTS <------<<

export const getEvents = async():Promise<ArtistType[] | undefined> => {
  try{
    const response = await fetch(`${mongo_url}/events`)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not get events: ', error)
    return undefined
  }
}

// >>------> POST FNS FOR ARTISTS <------<<
export const createEvent = async(prevState: State, formData: FormData) => {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    artistName: formData.get('artistName')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { title, description, link } = validatedFields.data

  const postBody = {
    'title': title,
    'description': description,
    'link': link
  }

  try {
    const postResponse = await fetch(`${mongo_url}/artists`, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const postData = await postResponse.json()

    revalidatePath('/');
    return postData
  } catch(error) {
    console.error('could not post artist: ', error)
    return undefined
  }
}

// >>------> DELETE FNS FOR ARTISTS <------<<
export const deleteArtist = async(artistId: string):Promise<void> => {
  try {
    await fetch(`${mongo_url}/artists/${artistId}`,
      {
        method: 'DELETE'
      }
    )

    // const data = await response.json()
    // console.log('artist delete data', data)
  }
  catch(error) {
    console.error('Could not fetch artist', error)
    //TODO: THROW HTTP ERROR INSTEAD
    return
  }

  revalidatePath(`/`)
  redirect(`/`)
}
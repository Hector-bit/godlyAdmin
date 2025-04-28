'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';
import { ArtistType } from '../lib/types/artistTypes';
import { redirect } from "next/navigation";

const mongo_url = process.env.MONGO_URL

const FormSchema = z.object({
  artistId: z.coerce.string().optional(),
  name: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  artistName: z.coerce
    .string()
    .optional()
    .nullable(),
  img: z.coerce
    .string()
    .optional()
    .nullable()
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  // date: z.string(),
});

export type ArtistState = {
  errors?: {
    artistId?: string[];
    name?: string[];
    artistName?: string[];
    img?: string[];
  };
  message?: string | null;
};

// >>------> GET FNS FOR ARTISTS <------<<

export const fetchArtists = async():Promise<ArtistType[] | undefined> => {
  try{
    const response = await fetch(`${mongo_url}/artists`)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch artists: ', error)
    return undefined
  }
}

export const fetchArtistById = async(artistId: string):Promise<ArtistType | undefined> => {
  try {
    const response = await fetch(`${mongo_url}/artists/${artistId}`)
    const data = await response.json()

    return data
  }
  catch(error) {
    console.error('Could not fetch artist', error)
    return undefined
  }
}


// >>------> POST FNS FOR ARTISTS <------<<
export const createArtist = async(prevState: ArtistState, formData: FormData) => {
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

  const { name, artistName } = validatedFields.data

  const postBody = {
    'name': name,
    'artistName': artistName
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

// >>------> UPDATE FNS FOR ARTISTS <------<<
export const updateArtist = async(prevState: ArtistState, formData: FormData) => {
  const validatedFields = FormSchema.safeParse({
    artistId: formData.get('artistId'),
    name: formData.get('name'),
    artistName: formData.get('artistName'),
    img: formData.get('img')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { artistId, name, artistName, img } = validatedFields.data

  const postBody = {
    'name': name,
    'artistName': artistName,
    'img': img
  }

  try {
    const postResponse = await fetch(`${mongo_url}/artists/${artistId}`, {
      method: "PATCH",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await postResponse.json()


    // return postData
  } catch(error) {
    console.error('could not post artist: ', error)
    return prevState
  }

  revalidatePath('/');
  redirect(`/`)
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
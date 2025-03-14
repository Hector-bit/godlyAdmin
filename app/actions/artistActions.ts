'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';

const mongo_url = process.env.MONGO_URL
const apiURL = process.env.MONGO_URL

const FormSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  artistName: z.coerce
    .string()
    .optional()
    .nullable()
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


export const fetchArtists = async() => {
  try{
    const response = await fetch(`${apiURL}/artists`)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not fetch artists: ', error)
    return []
  }
}

const CreateArtist = FormSchema


//CREATE ARTIST
export const createArtist = async(prevState: State, formData: FormData) => {
  console.log('running createArtist')
  const validatedFields = CreateArtist.safeParse({
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

  console.log('POST BODY: ', postBody, ' to => ', mongo_url)

  try {
    const postResponse = await fetch(`${mongo_url}/artists`, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const postData = await postResponse.json()
    console.log('POST DATA: ', postData)

    revalidatePath('/');
    return postData
  } catch(error) {
    console.error('could not post artist: ', error)
    return undefined
  }
}
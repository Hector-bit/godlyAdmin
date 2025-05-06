'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';
import { EventType } from '../lib/types/eventTypes';
import { redirect } from "next/navigation";

const mongo_url = process.env.MONGO_URL

const FormSchema = z.object({
  eventId: z.coerce.string(),
  title: z.string({
    invalid_type_error: 'Please enter event title',
  }),
  description: z.string().optional(),
  link: z.string().optional(),
  imgLink: z.string().optional()
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  // date: z.string(),
});

export type EventState = {
  errors?: {
    eventId?: string[]
    title?: string[]
    description?: string[]
    link?: string[]
    imgLink?: string[]
  };
  message?: string | null;
};

// >>------> GET FNS FOR ARTISTS <------<<

export const getEvent = async(eventId: string): Promise<EventType | undefined> => {
  try{
    const response = await fetch(`${mongo_url}/events/${eventId}`)
    const data = await response.json()
    // console.log('artist data: ', data)
    return data
  } catch(error) {
    console.error('could not get events: ', error)
    return undefined
  }
}

export const getEvents = async():Promise<EventType[] | undefined> => {
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
export const createEvent = async(prevState: EventState | undefined, formData: FormData) => {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    link: formData.get('link'),
    imgLink: formData.get('imgLink')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { title, description, link, imgLink } = validatedFields.data

  const postBody = {
    'title': title,
    'description': description,
    'link': link,
    'imgLink': imgLink
  }

  try {
    const postResponse = await fetch(`${mongo_url}/events`, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const postData = await postResponse.json()
    console.log('created event:', postData)

  } catch(error) {
    console.error('could not post event: ', error)
    return undefined
  }
  revalidatePath('/events');
  redirect(`/events`)
}

// >>------> PATCH FNS FOR EVENTS <------<<

export const updateEvent = async(prevState: EventState | undefined, formData: FormData) => {
  const validatedFields = FormSchema.safeParse({
    eventId: formData.get('eventId'),
    title: formData.get('title'),
    description: formData.get('description'),
    link: formData.get('link'),
    imgLink: formData.get('imgLink')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { eventId, title, description, link, imgLink } = validatedFields.data

  const postBody = {
    'title': title,
    'description': description,
    'link': link,
    'imgLink': imgLink
  }

  try {
    const postResponse = await fetch(`${mongo_url}/events/${eventId}`, {
      method: "PATCH",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const postData = await postResponse.json()
    console.log('created event:', postData)

  } catch(error) {
    console.error('could not post event: ', error)
    return undefined
  }
  revalidatePath('/events');
  redirect(`/events`)
}

// >>------> DELETE FNS FOR EVENTS <------<<
export const deleteEvent = async(eventId: string):Promise<void> => {
  try {
    await fetch(`${mongo_url}/events/${eventId}`,
      {
        method: 'DELETE'
      }
    )

    // const data = await response.json()
    // console.log('artist delete data', data)
  }
  catch(error) {
    console.error('Could not delete event', error)
    //TODO: THROW HTTP ERROR INSTEAD
    return
  }

  revalidatePath(`/events`)
  redirect(`/events`)
}
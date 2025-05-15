import Image from "next/image"
import Link from "next/link"

export default async function UploadImagePage () {
  return (
    <div>
      <div className="font-bold text-lg">Image upload instructions</div>
      <div className="flex flex-col gap-3">
      How to Create an Imgur Account and Upload an Image link
      <div>
        1. Create an <Link href={'https://imgur.com/'} className="text-cyan-600">Imgur Account</Link>:

            Go to imgur.com.

            Click on Sign Up at the top right corner.

            You can sign up with:

                Google, Apple, or Twitter accounts, OR

                Email: Enter a username, email, and password, then click Next and follow the prompts.

            Confirm your email address if Imgur sends you a verification email.
      </div>
      <div>
        2. Upload an Image:

            Once logged in, click the green New Post button at the top.

            Choose how you want to upload:

                Drag and drop an image into the window,

                Click `&ldquo;Choose Photo/Video`&ldquo; to browse your computer and select a file,

                Paste an image URL if your image is online.

            After the image uploads, you can:

                Add a Title,

                Set it to Public, Hidden, or Private (depending on your preference).

            Click Post to share it, or just copy the image link if you want to send it somewhere without posting publicly.

      </div>
      <Image src={"/exampleCreatePost.PNG"} alt={"create imgur post"} width={600} height={600}/>
      <div className="border border-black p-2 my-2 rounded-xl">
        <div>NOTE: you can also right click an image and click `copy image link` (`copy image address` for Macbooks)</div>
        <div>Then paste the image link into what img link input of events, artists, singles, etc.</div>
        <div>Example of what the imgur link should look like: https://i.imgur.com/EqCrK53.jpg</div>

      </div>
      <Image src={"/exampleImgur.png"} alt={"imgur example"} width={600} height={600}/>
      </div>
    </div>
  )
}
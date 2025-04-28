import Image from "next/image"

export default async function UploadImagePage () {
  return (
    <div>
      <div>Image upload instructions</div>
      <div className="flex flex-col gap-3">
      How to Create an Imgur Account and Upload an Image link
      <div>
        1. Create an Imgur Account:

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

                Click "Choose Photo/Video" to browse your computer and select a file,

                Paste an image URL if your image is online.

            After the image uploads, you can:

                Add a Title,

                Set it to Public, Hidden, or Private (depending on your preference).

            Click Post to share it, or just copy the image link if you want to send it somewhere without posting publicly.

      </div>
      <div className="border border-black p-2 my-2 rounded-xl">
        <div>NOTE: you can also right click an image and click 'copy image link'</div>
        <div>Example: https://i.imgur.com/EqCrK53.jpg</div>
      </div>
      <Image src={"/exampleImgur.png"} alt={"imgur example"} width={600} height={600}/>
      </div>
    </div>
  )
}
'use client'
import { ReactNode, useState } from "react"

type DeleteBtnType = {
  btnDeleteType: 'artist'
  children: ReactNode
}

const DeleteBtn = ({ children }: DeleteBtnType) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <>
      <button className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" onClick={() => setDeleteModal(true)}>
        <div>{children}</div>
      </button>
      {deleteModal &&
        <div className="fixed z-[2] inset-0 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border border-black rounded-xl p-4">
          <div className="flex flex-col gap-4">
            <div>Are you sure you want to delete</div>
            <button
                className="bg-cyan-500 text-white font-bold rounded-xl p-4 border-2 border-black"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
            <button
              className="bg-red-500 text-white font-bold rounded-xl p-4 border-2 border-black"
              onClick={() => console.log('nothing yet')}
            >
              Yes Delete
            </button>

          </div>
        </div>
      }
    </>
  )
}

export default DeleteBtn
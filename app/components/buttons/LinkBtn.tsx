import Link from "next/link"
import { ReactElement, ReactNode } from "react"

type LinkBtnType = {
  href: string,
  children: ReactNode
  classname?: string
}

const LinkBtn = ({href, children, classname }:LinkBtnType):ReactElement => {
  return (
    <Link 
      href={href}
      className={`${classname}p-2 border border-black bg-cyan-500 rounded-xl`}
    >
      <div className="text-sm text-white text-center font-bold">{children}</div>
    </Link>
  )
}

export default LinkBtn
import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import AuthProviders from "./AuthProviders"
import { curentUser } from "@/lib/session"

const Navbar = async () => {

    const sesssion = await curentUser();
    console.log(sesssion)

    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href='/'>
                    <Image
                        src='/logo.svg'
                        alt=""
                        width={115}
                        height={43}
                    />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.key}
                        >{link.text}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="flexCenter gap-4">
                {sesssion?.user ? (
                    <>
                        {
                            sesssion?.user?.image && (<Image src={sesssion.user.image} width={40} height={40} alt={sesssion.user.name} />)
                        }


                        <Link href='/create-project'>Sharework</Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}

export default Navbar

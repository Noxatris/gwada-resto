'use client'

import { useState } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNav() {

    const pathname = usePathname(); // Récupère l'URL de la page actuelle

    const [isLogin, setIsLogin] = useState(false);

    if (pathname.startsWith('/connexion')) {
        return null ; // Si la route commence par /connexion, n'affiche pas le layout global
    }

    return (
        <>
            {isLogin ? (
                <nav className="fixed top-12 right-0 w-[65px] h-fit flex flex-col items-center space-y-7 bg-black/75 p-3 rounded-l-3xl">
                    <Link href="/" className="w-12 h-12 flex justify-center items-center bg-green-500 rounded-full">
                        <FontAwesomeIcon icon={faUser} className="fa-fw" />
                    </Link>
                    <Link href="/" className="w-12 h-12 flex justify-center items-center bg-orange-500 rounded-full">
                        <FontAwesomeIcon icon={faCartShopping} className="fa-fw" />
                    </Link>
                    <button onClick={() => { setIsLogin(false) }} className="w-12 h-12 flex justify-center items-center bg-pink-500 rounded-full">
                        <FontAwesomeIcon icon={faRightToBracket} className="fa-fw" />
                    </button>
                </nav>
            ) : (
                <div className="fixed top-12 right-0 w-[65px] h-fit flex flex-col items-center space-y-7 bg-black/75 p-3 rounded-l-3xl">
                    <Link href="/connexion/login" className="w-12 h-12 flex justify-center items-center bg-cyan-400 rounded-full">
                        <FontAwesomeIcon icon={faUserPlus} className="fa-fw" />
                    </Link>
                </div>
            )}
        </>
    )
}
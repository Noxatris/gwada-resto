'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const result = await signIn('credentials', {
            redirect: false,
            identifiant,
            password,
        });

        if (result?.error) {
            setError(result.error);
            setPassword('');
        } else {
            router.push('/'); // Redirect to home page
        }
    };

    const isDisabled = !identifiant || !password;

    return (
        <div className='w-full h-[80%] rounded-2xl bg-white shadow-2xl m-8 flex flex-col items-center text-black'>
            <div className='w-[100px] h-[100px] text-xl mt-16 border-8 border-cyan-400 text-cyan-400 shadow-md rounded-full p-4 flex items-center justify-center'>
                <FontAwesomeIcon icon={faUser} className="fa-fw w-auto h-[80%]" />
            </div>
            <h1 className='mb-8 text-[2.5em] border-b-4 border-cyan-400 px-6'>Connexion</h1>
            <div className='w-full'>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="identifiant" className='mb-2'>Identifiant</label>
                    <input
                        type="text"
                        id='identifiant'
                        value={identifiant}
                        onChange={(e) => setIdentifiant(e.target.value)}
                        className={`w-[80%] h-[38px] ${error ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="password" className='mb-2'>Mot de passe</label>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-[80%] h-[38px] ${error ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <Link href="/connexion/register" className="mt-4 italic text-blue-500 flex flex-col items-center">
                <p>Vous n&apos;avez pas de compte ?</p>
                <p>Cliquez ici</p>
            </Link>
            <nav className='my-8 flex flex-row-reverse justify-between w-[80%]'>
                <button
                    onClick={handleLogin}
                    disabled={isDisabled}
                    className={`w-[35%] h-[50px] rounded-2xl ${isDisabled ? 'bg-gray-400' : 'bg-cyan-400'} text-white flex justify-center items-center`}
                >
                    <FontAwesomeIcon icon={faCircleCheck} className='fa-fw w-auto h-[65%]' />
                </button>
                <Link href="/" className="w-[35%] h-[50px] rounded-2xl bg-cyan-400 text-white flex justify-center items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className='fa-fw w-auto h-[65%]' />
                </Link>
            </nav>
        </div>
    );
}
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const [email, setEmail] = useState('');
    const [identifiant, setIdentifiant] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState({ email: false, identifiant: false, password: false, passwordConfirm: false, telephone: false, message: '' });
    const router = useRouter();

    const handleRegister = () => {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError({ ...error, email: true, message: 'Adresse email invalide.' });
            return;
        }

        // Validate telephone (French number)
        const telRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
        if (!telRegex.test(telephone)) {
            setError({ ...error, telephone: true, message: 'Numéro de téléphone invalide.' });
            return;
        }

        // Validate password match
        if (password !== passwordConfirm) {
            setError({ ...error, password: true, passwordConfirm: true, message: 'Les mots de passe ne correspondent pas.' });
            return;
        }

        // Simulate registration logic
        setError({ email: false, identifiant: false, password: false, passwordConfirm: false, telephone: false, message: '' });
        // Proceed with registration
        router.push('/'); // Redirect to home page
    };

    const isDisabled = !email || !identifiant || !password || !passwordConfirm || !telephone;

    return (
        <div className='w-full h-[80%] rounded-2xl bg-white shadow-2xl m-8 flex flex-col items-center text-black'>
            <div className='w-[100px] h-[100px] text-xl mt-16 border-8 border-cyan-400 text-cyan-400 shadow-md rounded-full p-4 flex items-center justify-center'>
                <FontAwesomeIcon icon={faAddressCard} className="fa-fw w-auto h-[80%]" />
            </div>
            <h1 className='mb-8 text-[2.5em] border-b-4 border-cyan-400 px-6'>S&apos;enregistrer</h1>
            <div className='w-full'>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="email" className='mb-2'>Adresse Mail</label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-[80%] h-[38px] ${error.email ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="identifiant" className='mb-2'>Nom</label>
                    <input
                        type="text"
                        id='identifiant'
                        value={identifiant}
                        onChange={(e) => setIdentifiant(e.target.value)}
                        className={`w-[80%] h-[38px] ${error.identifiant ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="telephone" className='mb-2'>Téléphone</label>
                    <input
                        type="tel"
                        id='telephone'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={`w-[80%] h-[38px] ${error.telephone ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="password" className='mb-2'>Mot de passe</label>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-[80%] h-[38px] ${error.password ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="passwordConfirm" className='mb-2'>Confirmé votre mot de passe</label>
                    <input
                        type="password"
                        id='passwordConfirm'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className={`w-[80%] h-[38px] ${error.passwordConfirm ? 'bg-red-200' : 'bg-gray-200'} rounded-xl pl-2 inset-shadow-xl`}
                    />
                </div>
            </div>
            {error.message && <p className="text-red-500 mt-4">{error.message}</p>}
            <Link href="/connexion/login" className="mt-4 italic text-blue-500 flex flex-col items-center">
                <p>Vous avez déjà un compte ?</p>
                <p>Cliquez ici</p>
            </Link>
            <nav className='my-8 flex flex-row-reverse justify-between w-[80%]'>
                <button
                    onClick={handleRegister}
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
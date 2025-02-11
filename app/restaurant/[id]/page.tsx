'use client'

import data from '@/app/dataTemp/restaurants.json'
import Image from 'next/image'

import MenuItem from '../../(components)/menuItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Restaurant() {

    const restaurant = data[0]

    return (
        <section>
            <Image src={restaurant.img_url} alt="Image Restaurant" width={500} height={500} />
            <div className='bg-white rounded-t-3xl pt-6 shadow text-black'>
                <div className='flex justify-between mx-4 items-center pb-2 border-b-4 border-cyan-400 mb-4'>
                    <h1 className='text-[2em]'>{restaurant.name}</h1>
                    <div className='flex justify-center items-center p-2 w-[45px] h-[45px] rounded-full bg-cyan-400 shadow-xl'>
                        <FontAwesomeIcon icon={faStar} className="fa-fw flex justify-center items-center text-yellow-500 text-2xl" />
                    </div>
                </div>
                <div className='flex ml-8 mb-4'>
                    {restaurant.tag.map(tag => (
                        <p key={tag} className='py-1 px-4 bg-cyan-400 mr-2 rounded-full text-white'>{tag}</p>
                    ))}
                </div>
                <div className='px-4 py-12 test'>
                    {restaurant.description}
                </div>
                <div className='mt-4 px-2'>
                    <div className='flex items-center mb-4'>
                        <button className='flex justify-center items-center rounded-full animate-pulse border-2 border-cyan-400 p-1 w-[40px] h-[40px] mr-2'><FontAwesomeIcon icon={faLocationDot} className="fa-fw flex justify-center items-center text-cyan-400 text-2xl" /></button>
                        <p>{restaurant.address}</p>

                    </div>
                    <div className='flex items-center mb-4'>
                        <button className='flex justify-center items-center rounded-full animate-pulse border-2 border-cyan-400 p-1 w-[40px] h-[40px] mr-2'><FontAwesomeIcon icon={faPhone} className="fa-fw flex justify-center items-center text-cyan-400 text-2xl" /></button>
                        <p>{restaurant.phone_number}</p>

                    </div>
                </div>
                <h2 className='w-full flex justify-center text-2xl border-b-4 border-cyan-400 pb-2'>Menu</h2>
                <div className='test pt-8 pb-16'>
                    {restaurant.menus.map(menu => (
                        <div key={menu.id} className='flex flex-col test2 mx-4 px-4 py-2 mb-8 rounded-xl'>
                            <h2 className='ml-8 text-xl py-2 flex self-center'>{menu.name}</h2>
                            <p className='mb-2'>{menu.description}</p>
                            <div>
                                {menu.items.map(item => (
                                    <MenuItem key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className='flex flex-col w-full items-center px-4'>
                        <p className='flex self-end mb-8'>Prix Total : {}€</p>
                        <button className='bg-cyan-400 text-white p-2 rounded-full w-10/12 shadow-xl'>Validé la commande</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

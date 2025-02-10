import data from '@/app/dataTemp/restaurants.json'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Menu {
    id: number;
    name: string;
    category: string;
    description: string;
    items: MenuItem[];
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    description : string;
    latitude: number;
    longitude: number;
    phone_number: string;
    img_url: string;
    email: string;
    note: string;
    opening_hours: Record<string, string>;
    menus: Menu[];
}

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
                <div className='px-4'>
                    {restaurant.description}
                </div>
                <p>{restaurant.address}</p>
                <p>{restaurant.phone_number}</p>
                <div>
                    {restaurant.menus.map(menu => (
                        <div key={menu.id}>
                            <h2>{menu.name}</h2>
                            <p>{menu.description}</p>
                            <div>
                                {menu.items.map(item => (
                                    <div key={item.id}>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

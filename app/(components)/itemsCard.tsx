interface ItemsCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function ItemsCard({ id, name, description, price }: ItemsCardProps) {
    return (
        <div id={id.toString()} className="flex items-center mb-2 justify-between w-full">
            <div className="">
                <h3 className="pl-4">{name}</h3>
                <p>{description}</p>
            </div>
            <div className="border-l-2 border-cyan-400 pl-2">
                {price}€
            </div>
        </div>
    )
}
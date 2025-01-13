const Card = ({ image, title, description, link, target }) => {
    return (
        <a 
            href={link} 
            target={target}
            rel="noopener noreferrer"
            className="hover:scale-105 hover:shadow-[0_0_20px_10px_rgba(255,215,0,0.9)] transition duration-300 rounded-lg max-w-sm bg-matcha block"
        >
            <img className="rounded-t-lg" src={image} alt={title} />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-light-black dark:text-gray-400">{description}</p>
            </div>
        </a>
    );
}

export default Card;
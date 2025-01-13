const Project = ({ image, title, description, link, target }) => {
    return (
        <a 
            href={link} 
            target={target}
            rel="noopener noreferrer"
            className="font-mono transition duration-300 rounded-lg border-solid border-4 border-matcha text-white bg-matcha mx-auto my-8 max-w-7xl w-full h-64 flex"
        >
            <img 
                className="rounded-l-lg w-1/3 h-full object-cover" 
                src={image} 
                alt={title} 
            />
            <div className="p-5 w-2/3 h-full flex flex-col justify-center">
                <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 text-white dark:text-gray-400">{description}</p>
            </div>
        </a>
    );
}

export default Project;

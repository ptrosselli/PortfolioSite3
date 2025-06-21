const Project = ({ image, title, description, link, target }) => {
    return (
        <a 
            href={link} 
            target={target}
            rel="noopener noreferrer"
            className="font-mono transition duration-300 rounded-lg border-4 border-matcha text-white bg-matcha mx-auto my-6 w-full max-w-3xl flex flex-col sm:flex-row"
        >
            <img 
            className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none w-full sm:w-1/3 h-48 sm:h-auto object-cover" 
            src={image} 
            alt={title} 
            />
            <div className="p-4 sm:p-6 w-full sm:w-2/3 flex flex-col justify-center">
                <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 text-white dark:text-gray-400">{description}</p>
            </div>
        </a>
    );
}

export default Project;

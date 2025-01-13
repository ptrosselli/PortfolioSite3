import Header from './Header.jsx';
import FeaturedProjects from './FeaturedProjects.jsx';
import Bio from './Bio.jsx';
import ChessB from './ChessB.jsx';

const Home = () => {
    return (
      <div className='font-mono bg-light-black'>
        <Bio/>
        <FeaturedProjects/>
        <ChessB></ChessB>
      </div>
    );
  }
  
  export default Home;
  
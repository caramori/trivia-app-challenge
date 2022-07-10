import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className='text-center'>
            <h1>Welcome to the Trivia Challenge</h1>
            <h2 className='m-t-3'>You will be presented with 10 True or False questions.</h2>
            <h3 className='m-t-3'>Can you score 100%?</h3>
            <div className='m-t-3'>
                <Link to={'/quiz'}><button className='ui button primary' name='begin'>BEGIN</button></Link>
            </div>
            
        </div>
    );
}

export default HomeScreen;
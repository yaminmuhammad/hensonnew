import './App.css';
// import Search from './components/search/index';
// import Button from './components/button/index';
import { ImageProps } from './components/image';
// import data from './components/gif/data';
import SearchBar from './pages/search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { setGif } from './store/querySlice';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const API_KEY = 'FMQABWCRKUTLpJ7uo06TbIcLGmw54rlp';

function App() {
  // const renderGifs = () => data.filter((d) => d.rating === 'g')
  // .map((d) => <ImageProps image={d.url} title={d.title} key={d.id}/>)

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='search'>Search</Link>
            </li>
            <li>
              <Link to='trending'>Trending</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/trending'>
          <Trending />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

const Home = () => {
  return <h2>Home</h2>
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState('');
  const gif = useSelector((state) => state.query.value);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const searchChange = (e) => { setSearch(e.target.value) };

  const getGiphyGifs = async () => {
    // e.preventDefault();
    // const temp = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=12`;
    await axios
      .get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=12`)
      .then((response) => {
        setGifs(response.data)
        // dispatch(setGif(response.data))
      });
  };
  return (
    <>
      <h2>Search</h2>
      <div className="App">
        <div className='Input'>
          {/* <Search />
            <Button /> */}
          <SearchBar getData={getGiphyGifs} getSearch={searchChange} query={gif} />
          <div className='gif'>
            <p>{gif.gif}</p>
            {gifs.data?.map((gif) => (
              <ImageProps title={gif.title} image={gif.images.fixed_width.url} key={gif.id} />
            ))}
          </div>
        </div>
        {/* <div>
            {renderGifs()}
          </div> */}
      </div>
    </>
  );
}

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  useEffect(() => {
    const getTrendingGifs = async () => {
      await axios
        .get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`)
        .then((res) => {
          console.log(res.data);
          setTrendingData(res.data);
        });
    };
    getTrendingGifs();
  }, [])

  return (
    <div className='trending'>
      <h2>Trending</h2>
      {trendingData.data?.map((trending) => (
        <ImageProps title={trending.title} image={trending.images.fixed_width.url} key={trending.id} />
      ))}
    </div>
  );
}

export default App;

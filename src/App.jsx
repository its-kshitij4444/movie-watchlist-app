import React, { useContext } from "react";
import { MovieContext } from "./components/GlobalState";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";

const App = () => {
  const { searchParam, setSearchParam, loading, searchResults } =
    useContext(MovieContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h1 className="title text-7xl font-bold">Movie Watchlist App</h1>
        <input
          type="text"
          name="searchParam"
          value={searchParam}
          className="border-none p-2 m-5"
          placeholder="Search for a movie..."
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <div className="flex justify-evenly w-full">
        <Watchlist />
        <Watched />
        </div>
        {loading ? <p className="text-white">Loading...</p> : null}
      </div>

      <div className="grid grid-cols-4 gap-2 m-10 text-white">
        {searchResults && searchResults.length > 0 && !loading ? (
          searchResults.map((movieItem) => (
            <MovieCard key={movieItem.id} movieItem={movieItem} />
          ))
        ) : (
          <h1 className="text-white text-lg font-bold">
            No movies were found!
          </h1>
        )}
      </div>
    </>
  );
};

export default App;

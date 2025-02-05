import React, { useContext } from "react";
import { MovieContext } from "./GlobalState";

const MovieCard = ({ movieItem }) => {
  const { handleAddtoWatched, handleAddtoWatchlist, handleMoveToWatched, state } = useContext(MovieContext);

  const isInWatchList = state.watchList.find((item) => item.id === movieItem.id);
  const isInWatched = state.watched.find((item) => item.id === movieItem.id);

  return (
    <div>
      <div className="flex flex-col justify-center items-center border-2 border-white rounded-lg p-5">
        {movieItem?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200/${movieItem.poster_path}`}
            alt={movieItem.title}
          />
        ) : (
          <div className="flex justify-center items-center w-[200px] h-[300px] bg-blue-400 text-lg font-bold">
            No image available
          </div>
        )}
        <h2 className="text-2xl font-bold">{movieItem.title}</h2>
        <p className="text-lg">{movieItem.release_date}</p>
        <p>Original Title: {movieItem?.original_title}</p>

        {!isInWatched && (
          <button
            disabled={isInWatchList}
            onClick={() => handleAddtoWatchlist(movieItem)}
            className={`gradient-colors text-lg m-2 p-2 rounded-md ${
              isInWatchList ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add to Watchlist
          </button>
        )}

        {!isInWatched && (
          <button
            onClick={() => {
              if (isInWatchList) {
                handleMoveToWatched(movieItem);
              } else {
                handleAddtoWatched(movieItem);
              }
            }}
            className={`gradient-colors text-lg m-2 p-2 rounded-md ${
              isInWatched ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isInWatchList ? "Move to Watched" : "Add to Watched"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

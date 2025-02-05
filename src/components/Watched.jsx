import React from "react";
import { useContext } from "react";
import { MovieContext } from "./GlobalState";

const Watched = () => {
  const { state, handleRemoveFromWatched } = useContext(MovieContext);

  return (
    <div className="flex flex-col">
      <h1 className="title-reversed text-6xl font-bold mb-8 text-center">
        Watched
      </h1>
      {state.watched && state.watched.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {state.watched.map((movieItem) => (
            <div
              key={movieItem.id}
              className="flex flex-col items-center border-2 border-white rounded-lg p-5 text-white"
            >
              {movieItem?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movieItem.poster_path}`}
                  alt={movieItem.title}
                  className="w-[200px] h-auto mb-4"
                />
              ) : (
                <div className="flex justify-center items-center w-[200px] h-[300px] bg-blue-400 text-lg font-bold">
                  No image available
                </div>
              )}
              <h2 className="text-2xl font-bold">{movieItem.title}</h2>
              <p className="text-lg">{movieItem.release_date}</p>
              <p>Original Title: {movieItem?.original_title}</p>
              <button
                onClick={() => handleRemoveFromWatched(movieItem)}
                className="mt-4 text-white px-4 py-2 rounded-md"
              >
                Remove from Watched
              </button>
            </div>
          ))}

          {/* <button
                  disabled={state.watched.findIndex((item) =>
                    item.id === movieItem.id > -1 ? true : false
                  )}
                  onClick={() => handleAddtoWatched(movieItem)}
                  className="gradient-colors text-lg m-2 p-2 rounded-md"
                >
                  Add to Watched
                </button> */}
        </div>
      ) : (
        <h1 className="text-white text-lg font-bold">No movie added yet!</h1>
      )}
    </div>
  );
};

export default Watched;

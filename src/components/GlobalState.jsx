import { createContext, useEffect, useState, useReducer } from "react";
import {
  ADD_TO_WATCHLIST,
  ADD_TO_WATCHED,
  REMOVE_FROM_WATCHED,
  REMOVE_FROM_WATCHLIST,
  MOVE_TO_WATCHED,
} from "./types";
import Reducer from "./Reducer";
export const MovieContext = createContext();

const initialState = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [state, dispatch] = useReducer(Reducer, initialState);

  async function fetchList() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `http://localhost:5000/api/search?query=${searchParam}`
      );
      const result = await apiResponse.json();
  
      if (result && result.results && result.results.length > 0) {
        setSearchResults(result.results);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    if (searchParam !== "") fetchList();
  }, [searchParam]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
  }, [state.watchList]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state.watched]);

  function handleAddtoWatchlist(movie) {
    dispatch({
      type: ADD_TO_WATCHLIST,
      payload: movie,
    });
  }

  function handleAddtoWatched(movie) {
    dispatch({
      type: ADD_TO_WATCHED,
      payload: movie,
    });
  }

  function handleRemoveFromWatchlist(movie) {
    if (movie && movie.id) {
      dispatch({
        type: REMOVE_FROM_WATCHLIST,
        payload: movie,
      });
    }
  }

  function handleRemoveFromWatched(movie) {
    if (movie && movie.id) {
      // console.log("Removing movie:", movie);
      dispatch({
        type: REMOVE_FROM_WATCHED,
        payload: movie,
      });
    }
  }

  function handleMoveToWatched(movie){
    dispatch({
      type: MOVE_TO_WATCHED,
      payload: movie,
    })
  }

  return (
    <MovieContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        searchResults,
        handleAddtoWatchlist,
        handleAddtoWatched,
        handleRemoveFromWatched,
        handleRemoveFromWatchlist,
        handleMoveToWatched,
        state,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default GlobalState;

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieContext } from "./components/GlobalState";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import Header from "./components/Header";
import Login from "./components/Login";

const App = () => {
  const { searchParam, setSearchParam, loading, searchResults, user } =
    useContext(MovieContext);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="max-[374px]:text-center flex flex-col justify-center items-center m-10">
                <h1 className="min-[320px]:text-4xl min-[785px]:text-7xl title font-bold">Movie Watchlist App</h1>
                <input
                  type="text"
                  name="searchParam"
                  value={searchParam}
                  className="border-none p-2 m-5"
                  placeholder="Search for a movie..."
                  onChange={(e) => setSearchParam(e.target.value)}
                />
                {loading ? <p className="text-white">Loading...</p> : null}
              </div>

              <div className="grid min-[768px]:grid-cols-4 gap-2 m-10 text-white">
                {searchResults && searchResults.length > 0 && !loading ? (
                  searchResults.map((movieItem) => (
                    <MovieCard key={movieItem.id} movieItem={movieItem} />
                  ))
                ) : (
                  <h1 className="flex absolute right-[672px] text-white text-lg font-bold">
                    No movies were found!
                  </h1>
                )}
              </div>
            </div>
          }
        />
        <Route path="/watchlist" element={
          <div className="flex justify-evenly w-full m-10">
            <Watchlist />
            <Watched />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
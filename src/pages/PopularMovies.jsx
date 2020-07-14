import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import movieService from '../services/movie-db.service';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';
import SkeltonLoader from '../components/SkeltonLoader';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getPopularMovies();
      setMovies(data.results);
      setPage(data.page);
    };

    fetchData();
  }, []);

  const fetchMovies = async () => {
    const data = await movieService.getPopularMovies(page + 1);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(data.page);
  };

  return (
    <>
      <Typography variant="h6">Popular Movies</Typography>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={page !== 1000}
        loader={<SkeltonLoader />}
      >
        <VerticalMovieList movies={movies} />
      </InfiniteScroll>
    </>
  );
};

export default PopularMovies;

import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));

const PopularMovies = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getPopularMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Popular Movies</Typography>
      <HorizontalMovieList movies={movies} />
    </div>
  );
};

export default PopularMovies;

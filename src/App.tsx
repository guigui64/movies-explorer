import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Container,
  makeStyles,
} from "@material-ui/core";

enum Genre {
  Action,
  Adult,
  Adventure,
  Animation,
  Biography,
  Comedy,
  Crime,
  Documentary,
  Drama,
  Family,
  Fantasy,
  FilmNoir,
  GameShow,
  History,
  Horror,
  Musical,
  Music,
  Mystery,
  News,
  RealityTV,
  Romance,
  SciFi,
  Short,
  Sport,
  TalkShow,
  Thriller,
  War,
  Western,
}

type Movie = {
  title: string;
  posterUrl: string;
  rating: number;
  votes: number;
  imdbID: string;
  genres: Genre[];
  year: number;
  plot: string;
  runtime: number;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: "148%", // poster usual size
  },
});

function MovieCard({ movie }: { movie: Movie }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        image={movie.posterUrl}
        title={movie.title}
        className={classes.media}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h1">
          {movie.title} ({movie.year})
        </Typography>
        <Typography gutterBottom variant="subtitle2">
          {movie.rating} ({movie.votes}) &ndash; {movie.runtime} minutes &ndash;{" "}
          {movie.genres.map((g) => Genre[g]).join(", ")}
        </Typography>
        <Typography variant="body2">{movie.plot}</Typography>
      </CardContent>
    </Card>
  );
}

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  useEffect(() => {
    setMovies(
      Array(10).fill({
        title: "Django Unchained",
        year: 2012,
        runtime: 165,
        genres: [Genre.Drama, Genre.Western],
        plot:
          "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
        posterUrl:
          "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
        rating: 8.4,
        votes: 1315603,
        imdbID: "tt1853728",
      })
    );
  }, [setMovies]);
  return (
    <Container>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;

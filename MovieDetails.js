import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { BaseRouter } from "@react-navigation/native";
import { movie } from "./mockData.js";
import API from './env.js';

function MovieDetails(props) {
  const temp = props.route.params.movieID;

  return (
    <View style={styles.container}>
      <Text>{movie.Title}</Text>
      <Text>Year of Release - {movie.Year}</Text>
      <Text>Rating - {movie.Rated}</Text>
      <Text>Runtime - {movie.Runtime}</Text>
      <Text>Genre - {movie.Genre}</Text>
      <Text>Director - {movie.Director}</Text>
      <Text>Actors - {movie.Actors}</Text>
      <Text>Languages - {movie.Language}</Text>
      <Text>Awards - {movie.Awards}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MovieDetails;

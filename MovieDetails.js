import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { BaseRouter } from "@react-navigation/native";
import { movie } from "./mockData.js"

function MovieDetails(props) {
  const temp = props.route.params.movieID;

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: "bold"}}>{movie.Title}</Text>
      <Text>Year of Release - <b>{movie.Year}</b></Text>
      <Text >Rating - {movie.Rated}</Text>
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
    padding: 20,
    margin:2,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
});

export default MovieDetails;

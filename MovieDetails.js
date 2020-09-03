import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { BaseRouter } from "@react-navigation/native";
import { movie } from "./mockData.js"

function MovieDetails(props) {
  const temp = props.route.params.movieID;

  return (
    <View style={styles.container}>
       <Text style={{ fontWeight: "bold",fontSize:21 }}>{movie.Title}</Text>
       <Text style={styles.boldtText}>Year of Release - {movie.Year}</Text>
       <Text style={styles.boldtText}>Rating - {movie.Rated}</Text>
       <Text style={styles.boldtText}>Runtime - {movie.Runtime}</Text>
       <Text style={styles.boldtText}>Genre - {movie.Genre}</Text>
       <Text style={styles.boldtText}>Director - {movie.Director}</Text>
       <Text style={styles.boldtText}>Actors - {movie.Actors}</Text>
       <Text style={styles.boldtText}>Languages - {movie.Language}</Text>
       <Text style={styles.boldtText}>Awards - {movie.Awards}</Text>
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

  },
  boldtText: {
    fontSize: 18,
  }
});

export default MovieDetails;

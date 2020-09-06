import React from "react";
import Svg, { Rect } from "react-native-svg";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { BaseRouter } from "@react-navigation/native";
import { movie } from "./mockData.js";
import API from './env.js';

function MovieDetails(props) {
  const temp = props.route.params.movieID;

  function normalizeRatings(rating) {
    var result = NaN
    if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(rating)) {
      result = parseFloat(rating)
    } else {
      var split = rating.split('/');
      var result = split[0]/split[1]*100
    }
    return result
  }

  ratings = () => {
    return movie.Ratings.map((item, index) => (
      <View style={styles.rating} key={index}>
        <Text>{item.Source}</Text>
        <Svg width="50%" height="100%">
          <Rect
            width="50%"
            height="100%"
            fill="rgb(0,223,23)"
            strokeWidth="0"
          />
          <Rect
            x={normalizeRatings(item.Value)}
            width={100 - normalizeRatings(item.Value)}
            height="100%"
            fill="rgb(223,223,127)"
            strokeWidth="0"
          />
          <Text>{item.Value}</Text>
        </Svg>
      </View>
    ));
  }

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
       <View>{ratings()}</View>
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
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  }
});

export default MovieDetails;

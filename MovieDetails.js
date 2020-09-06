import React from "react";
import Svg, { Rect } from "react-native-svg";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { OMDB_KEY } from "./env.js";

export default class MovieDetails extends React.Component {
  state = {
    movieId: this.props.route.params.movieID,
    movie: null,
    isLoading: true,
    navigation: this.props.navigation,
    url: "http://www.omdbapi.com/?apikey=",
  };

  componentDidMount() {
    fetch(`${this.state.url}${OMDB_KEY}&i=${this.state.movieId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ movie: data, isLoading: false });
      });
  }

  normalizeRatings(rating) {
    var result = NaN;
    if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(rating)) {
      result = parseFloat(rating);
    } else {
      var split = rating.split("/");
      var result = (split[0] / split[1]) * 100;
    }
    return result;
  }

  ratings = () => {
    return this.state.movie.Ratings.map((item, index) => (
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
            x={this.normalizeRatings(item.Value)}
            width={100 - this.normalizeRatings(item.Value)}
            height="100%"
            fill="rgb(223,223,127)"
            strokeWidth="0"
          />
          <Text>{item.Value}</Text>
        </Svg>
      </View>
    ));
  };
  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>
          {this.state.movie.Title}
        </Text>
        <Text style={styles.boldtText}>
          Year of Release - {this.state.movie.Year}
        </Text>
        <Text style={styles.boldtText}>Rating - {this.state.movie.Rated}</Text>
        <Text style={styles.boldtText}>
          Runtime - {this.state.movie.Runtime}
        </Text>
        <Text style={styles.boldtText}>Genre - {this.state.movie.Genre}</Text>
        <Text style={styles.boldtText}>
          Director - {this.state.movie.Director}
        </Text>
        <Text style={styles.boldtText}>Actors - {this.state.movie.Actors}</Text>
        <Text style={styles.boldtText}>
          Languages - {this.state.movie.Language}
        </Text>
        <Text style={styles.boldtText}>Awards - {this.state.movie.Awards}</Text>
        <View>{this.ratings()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 2,
    alignSelf: "center",
  },
  boldtText: {
    fontSize: 18,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
});

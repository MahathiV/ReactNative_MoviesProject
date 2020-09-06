import React from "react";
import Svg, { Rect } from "react-native-svg";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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
        <Text style={styles.ratingLabel}>{item.Source}</Text>
        <Svg width="50%" height="100%" style={styles.svgStyling}>
          <Rect
            width="100"
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
      <ScrollView style={styles.container}>
        <Text style={styles.movieTitle}>{this.state.movie.Title}</Text>
        <View style={styles.row}>
          <Text style={styles.boldtText}>Year of Release - </Text>
          <Text style={styles.details}>{this.state.movie.Year}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Rating - </Text>
          <Text style={styles.details}>{this.state.movie.Rated}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Runtime - </Text>
          <Text style={styles.details}>{this.state.movie.Runtime}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Genre - </Text>
          <Text style={styles.details}>{this.state.movie.Genre}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Director - </Text>
          <Text style={styles.details}>{this.state.movie.Director}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Actors - </Text>
          <Text style={styles.details}>{this.state.movie.Actors}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Languages - </Text>
          <Text style={styles.details}>{this.state.movie.Language}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldtText}>Awards - </Text>
          <Text style={styles.details}>{this.state.movie.Awards}</Text>
        </View>
        <View style={styles.scoreBoard}>{this.ratings()}</View>
      </ScrollView>
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
  details: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    borderColor: "black",
    borderBottomWidth: 0.4,
    paddingTop: 10,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: "55%",
  },
  scoreBoard: {
    borderColor: "black",
    borderWidth: 0.5,
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  svgStyling: {
    alignItems: "flex-end",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
    borderBottomWidth: 1,
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Picker,
} from "react-native";
import { OMDB_KEY } from "./env.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SearchResults extends React.Component {
  state = {
    data: null,
    isLoading: true,
    navigation: this.props.navigation,
    searchTitle: "blade",
    url: "http://www.omdbapi.com/?apikey=",
    page: 0,
    allResults: [],
    selectedFilter: null,
  };

  componentDidMount() {
    this.getMovieData();
  }

  populatedDecades = () => {
    let decades = this.state.allResults.map((item) => {
      return (Math.floor(+item["Year"] / 10) * 10).toString();
    });

    return [...new Set(decades)]
      .sort()
      .map((decade) => (
        <Picker.Item label={decade} value={decade} key={decade} />
      ));
  };

  getMovieData = () => {
    this.setState({ page: ++this.state.page });
    fetch(
      `${this.state.url}${OMDB_KEY}&s=${this.state.searchTitle}&page=${this.state.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allResults: [...this.state.allResults, ...data.Search],
          isLoading: false,
        });
      });
  };

  updateSearchTerm = (e) => {
    this.setState(
      {
        searchTitle: e.nativeEvent.text,
        page: 0,
        allResults: [],
      },
      () => {
        this.getMovieData();
      }
    );
  };

  movieTitles = () => {
    return this.filteredResults().map((item) => (
      <View key={item.imdbID} style={styles.searchResult}>
        <TouchableOpacity
          onPress={() =>
            this.state.navigation.navigate("Detail", { movieID: item.imdbID })
          }
        >
          <Image style={styles.posterView} source={{ uri: `${item.Poster}` }} />
          <Text style={styles.movieTitleView}>{item["Title"]}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  searchResults = () => {
    return <View style={styles.searchResultsRow}>{this.movieTitles()}</View>;
  };

  filteredResults = () => {
    if (this.state.selectedFilter === null) return this.state.allResults;

    const result = this.state.allResults.filter((movie) => {
      return parseInt(+movie.Year / 10) === this.state.selectedFilter / 10;
    });
    return result;
  };

  handleScroll = (e) => {
    const bottom =
      e.nativeEvent.contentSize.height -
        e.nativeEvent.contentOffset.y -
        e.nativeEvent.layoutMeasurement.height <
      20;
    if (bottom) {
      this.getMovieData();
    }
  };

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <ScrollView style={styles.container} onScroll={this.handleScroll}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onSubmitEditing={(e) => this.updateSearchTerm(e)}
        ></TextInput>
        <Picker
          selectedValue={this.state.selectedFilter}
          style={{ height: 50, width: 150 }}
          onValueChange={(year) => this.setState({ selectedFilter: year })}
        >
          <Picker.Item label="All" value={null} key="All" />
          {this.populatedDecades()}
        </Picker>
        {this.searchResults()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchResultsRow: {
    maxWidth: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  searchResult: {
    width: "45%",
    alignSelf: "center",
    backgroundColor: "#000000",
    marginTop: 10,
    marginBottom: 10,
  },
  posterView: {
    height: 300,
    resizeMode: "contain",
  },
  movieTitleView: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#99FFFF",
  },
});

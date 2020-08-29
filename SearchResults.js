import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { search, movie } from "./mockData";

export default class SearchResults extends React.Component {
  state = {
    searchTitle: "",
  };

  onChangeText = (val) => {
    this.setState({ searchTitle: val });
  };

  movieTitles = () => {
    return search["Search"].map((item) => (
      <View key={item.imdbID} style={styles.searchResult}>
        <Image style={styles.posterView} source={{ uri: `${item.Poster}` }} />
        <Text style={styles.movieTitleView}>{item["Title"]}</Text>
      </View>
    ));
  };

  searchResults = () => {
    return <View style={styles.searchResultsRow}>{this.movieTitles()}</View>;
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => this.onChangeText(text)}
        ></TextInput>
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

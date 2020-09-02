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
import API from "./env.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SearchResults extends React.Component {
  state = {
    data: null,
    isLoading: true,
    navigation: this.props.navigation,
    searchTitle: "blade",
    url: "http://www.omdbapi.com/?apikey=",
  };

  componentDidMount() {
    fetch(`${this.state.url}${API.data}&s=${this.state.searchTitle}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
        this.setState({ isLoading: !this.state.isLoading });
      });
  }

  onChangeText = (val) => {
    this.setState({ searchTitle: val });
  };

  movieTitles = () => {
    return this.state.data["Search"].map((item) => (
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

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

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

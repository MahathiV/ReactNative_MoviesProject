import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { search, movie } from "./mockData";

export default function App() {
  movieTitles = () => {
    return search["Search"].map((item) => (
      <View key={item.imdbID}>
        <Image style={styles.posterView} source={{ uri: `${item.Poster}` }} />
        <Text style={styles.movieTitleView}>{item["Title"]}</Text>
      </View>
    ));
  };

  return <ScrollView>{this.movieTitles()}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  posterView: {
    height: 400,
    resizeMode: "contain",
  },
  movieTitleView: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

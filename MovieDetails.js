import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { BaseRouter } from "@react-navigation/native";

function MovieDetails(props) {
  const temp = props.route.params.movieID;

  return (
    <View style={styles.container}>
      <Text>Details for movie {temp} </Text>
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

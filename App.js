import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>{this.searchResults()}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

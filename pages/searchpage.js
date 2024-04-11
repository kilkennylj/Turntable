import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

function SearchPage({ navigation, route }) {
  const { album } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.albumContainer}>
        <Image source={{ uri: album.Cover }} style={styles.albumCoverImage} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.centeredText, { color: "red", fontSize: 30 }]}>
          {album.Name}
        </Text>
        <Text style={{ color: "black", fontSize: 20 }}>{album.Artist}</Text>
        <Text style={{ color: "black", fontSize: 20 }}>{album.Year}</Text>

        <Text style={{ color: "black",  }}>Tags: {album.Tags.join(", ")}</Text>
        {album.Tracks.map((track, index) => (
          <Text key={index} style={{ color: "black",textAlign: 'left' }}>
            Song: {track} - {album.Length[index]} Sec
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6C6C6C",
    paddingTop: 20,
  },
  albumContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  // other styles...
  albumCoverImage: {
    width: 400,
    height: 400,
    borderRadius: 10, // this makes the image corners rounded
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#C0C0C0",
    flexGrow: 1, // Allow the content to grow vertically within the ScrollView
    alignItems: "center",
  },
  centeredText: {
    textAlign: "center",
  },
});

export default SearchPage;

import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

function SearchPage({ navigation, route }) {
  const { album } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6C6C6C",
      }}
    >
      <View style={styles.albumContainer}>
        <Image source={{ uri: album.Cover }} style={styles.albumCoverImage} />
      </View>

      <View>
        <Text>Artist: {album.Artist}</Text>
        <Text>Year: {album.Year}</Text>
        <Text>Length: {album.Length.join(", ")}</Text>
        <Text>Name: {album.Name}</Text>
        <Text>Tags: {album.Tags.join(", ")}</Text>
        <Text>Tracks: {album.Tracks.join(", ")}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C6C6C",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingBottom: 80,
    backgroundColor: "#6C6C6C",
    height: 500,
  },
  albumContainer: {
    marginHorizontal: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    height: "50%",
    marginBottom: 15,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  albumCoverImage: {
    width: 400,
    height: 400,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#C0C0C0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  gap: {
    width: 10, // Adjust the gap size as needed
  },

  banner: {
    backgroundColor: "#6C6C6C",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 30,
    fontFamily: "Hendangan",
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  centeredText: {
    textAlign: "center",
  },
});
export default SearchPage;

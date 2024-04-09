import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";

class Album {
  constructor(Artist, Year, Cover, Length, Name, Tags, Tracks) {
    this.Artist = Artist;
    this.Year = Year;
    this.Cover = Cover;
    this.Length = Length;
    this.Name = Name;
    this.Tags = Tags;
    this.Tracks = Tracks;
  }
}

let calledfromaddalbum = false;
let justloged = true;
let searching = false;

const LandingPage = ({ navigation, route }) => {
  const { jwt } = route.params;

  const [albums, setAlbums] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //const albumsofuser = [];
  const [albumsofuser, setAlbumsofuser] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [globalCopy, setGlobalCopy] = useState(null); // State to hold th
  const [defaultRating, setdefaultRating] = useState(2);
  const [ratings, setRatings] = useState({});
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const handleRating = (albumId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [albumId]: rating, // Set the rating for the specific album
    }));
  };

  const flatListRef = React.useRef();

  const starImageFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImageCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaultRating()}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Function to find the index of an album by name
  const findIndex = (albumName, albumArray) => {
    // Use Array.findIndex() to find the index of the album
    let index = 0;
    for (let j = 0; j < albumArray.length; j++) {
      console.log(
        "Album Name:",
        albumArray[j].Name,
        "Search Query:",
        albumName
      );
      if (albumArray[j].Name === albumName) {
        console.log("Found album at index:", j);
        index = j;
        break;
      }
    }
    console.log("Index:", index);
    return index;
  };

  const SearchUserAlbum = async () => {
    needtocroll = true;
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        userId: "65d91cfbf69237517bfc7118",
        search: searchQuery,
        jwtToken: jwt,
      };

      const response = await fetch(
        "https://turntable-d8f41b9ae77d.herokuapp.com/api/searchuseralbum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, text: ${text}`
        );
      }

      const responseData = await response.json();
      console.log("Number Of albums: ", responseData.albums.length);
      //

      if (justloged === true) {
        const updatedAlbums = responseData.albums.map((albumData) => {
          const { Artist, Year, Cover, Length, Name, Tags, Tracks } = albumData;
          return new Album(Artist, Year, Cover, Length, Name, Tags, Tracks);
        });

        // Use a functional update to correctly incorporate previous state
        setAlbumsofuser((prevAlbums) => [...prevAlbums, ...updatedAlbums]);
        justloged = false; // Reset the flag after processing
      } else {
        console.log("Scrolling to index ");
        flatListRef.current.scrollToIndex({
          index: findIndex(searchQuery, albumsofuser),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const DeleteUserAlbum = async (album) => {
    console.log("Trying to send data", searchQuery, jwt);

    try {
      const data = {
        userId: "65d91cfbf69237517bfc7118",
        name: album.Name,
        jwtToken: jwt,
      };

      const response = await fetch(
        "https://turntable-d8f41b9ae77d.herokuapp.com/api/deleteuseralbum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, text: ${text}`
        );
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      const ArtistName = responseData;
      console.log("Response:", ArtistName);
      setAlbumsofuser((prevAlbums) =>
        prevAlbums.filter((albumtodelete) => albumtodelete.Name !== album.Name)
      );

      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (justloged === true) SearchUserAlbum();

  const UpdateUserRating = async () => {
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        userId: "65d91cfbf69237517bfc7118",
        name: searchQuery,
        rating: 5,
        jwtToken: jwt,
      };

      const response = await fetch(
        "https://turntable-d8f41b9ae77d.herokuapp.com/api/updateuserrating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, text: ${text}`
        );
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      const ArtistName = responseData;
      console.log("Response:", ArtistName);

      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const SearchAlbum = async () => {
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        search: searchQuery,
        jwtToken: jwt,
      };

      const response = await fetch(
        "https://turntable-d8f41b9ae77d.herokuapp.com/api/searchalbum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, text: ${text}`
        );
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      // const ArtistName = responseData;

      const NewAlbum = new Album(
        responseData.results.Artist,
        responseData.results.Year,
        responseData.results.Cover,
        responseData.results.Length,
        responseData.results.Name,
        responseData.results.Tags,
        responseData.results.Tags,
        responseData.results.Tracks
      );

      const newAlbumInstance = new Album(
        responseData.results.Artist,
        responseData.results.Year,
        responseData.results.Cover,
        responseData.results.Length,
        responseData.results.Name,
        responseData.results.Tags,
        responseData.results.Tracks
      );

      setGlobalCopy(newAlbumInstance); // Update the global copy of NewAlbum

      if (searching) {
        navigation.navigate("searchpage", { album: NewAlbum });

        searching = false;
      }

      if (calledfromaddalbum === true) {
        setAlbumsofuser([...albumsofuser, NewAlbum]);
        albumsofuser.forEach((album) => console.log(album));
        calledfromaddalbum = false;
        flatListRef.current.scrollToIndex({
          index: albumsofuser.length,
        });
      } else {
        setAlbums([responseData.results]);
        //console.log('Response:', responseData.results);
        // console.log("Response:", NewAlbum);
      }

      //return NewAlbum;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addAlbum = () => {
    const data = {
      userId: "65d91cfbf69237517bfc7118",
      name: searchQuery,
      jwtToken: jwt,
    };

    fetch("https://turntable-d8f41b9ae77d.herokuapp.com/api/adduseralbum", {
      // Corrected endpoint URL
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        Alert.alert("You  already have this album!, TRY ANOTHER ONE!");
        if (res.error && res.error.length > 0) {
          setMessage("API Error: " + res.error);
        } else {
          console.log("Album added:", res.results);

          calledfromaddalbum = true;
          SearchAlbum([res.results]);

          flatListRef.current.scrollToEnd({ animated: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error adding album. Please try again.");
      });
  };

  const handleAlbumPress = (album) => {
    setSelectedAlbum(album);
    console.log("Clicked on album:", album);
  };

  const renderAlbumCover = ({ album }) => (
    <View>
      <View
        style={{
          width: 200,
          height: 50,
          overflow: "hidden",
          centeredText: true,
          marginHorizontal: 10,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        <Button
          title="Delete"
          color="red"
          Alert="Are you sure you want to delete this album?"
          onPress={() => DeleteUserAlbum(album)}
        />
      </View>

      <TouchableOpacity onPress={() => handleAlbumPress(album)}>
        <View style={styles.albumContainer}>
          <Image source={{ uri: album.Cover }} style={styles.albumCoverImage} />
        </View>
      </TouchableOpacity>
      <CustomRatingBar />
    </View>
  );

  const renderAlbumDetails = () => {
    if (selectedAlbum) {
      return (
        <View style={styles.albumDetailsContainer}>
          <Text>Name: {selectedAlbum.Name}</Text>
          <Text>Artist: {selectedAlbum.Artist}</Text>
          <Text>Year: {selectedAlbum.Year}</Text>
          <Text>Tags: {selectedAlbum.Tags.join(", ")}</Text>
          <Text>Tracks:</Text>
          {selectedAlbum.Tracks.map((track, index) => (
            <Text key={index}>{track}</Text>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Turntable</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={albumsofuser}
        renderItem={({ item: album }) => (
          <TouchableOpacity onPress={() => handleAlbumPress(album)}>
            {renderAlbumCover({ album })}
          </TouchableOpacity>
        )}
        keyExtractor={(album, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
      />
      <ScrollView style={styles.textContainer}>
        {selectedAlbum && (
          <View>
            <Text style={styles.centeredText}>Album Information:</Text>
            <Text>Name: {selectedAlbum.Name}</Text>
            <Text>Artist: {selectedAlbum.Artist}</Text>
            <Text>Year: {selectedAlbum.Year}</Text>
            <Text>Tags: {selectedAlbum.Tags.join(", ")}</Text>
            <Text>Tracks:</Text>
          </View>
        )}

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search albums"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.buttonContainer}>
            <Button title="Search" onPress={SearchUserAlbum} color="grey" />

            <View style={styles.gap} />
            <Button title="Add" onPress={addAlbum} color="grey" />
          </View>
        </View>
      </ScrollView>
      <Button
        title="Search Turntable"
        onPress={() => {
          //const album = SearchAlbum();
          SearchAlbum();
          searching = true;
          //navigation.navigate("searchpage", { album: hardcodedAlbum });
        }}
        color="RED"
      />
    </View>
  );
};

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
    backgroundColor: "transparent",
    height: 500,
  },
  albumContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    overflow: "hidden",
    height: "100%",
    marginBottom: 0,
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
    backgroundColor: "transparent",
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

  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },

  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});

export default LandingPage;

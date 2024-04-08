import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Button } from 'react-native';



const LandingPage = ({ navigation, route }) => {
  const { jwt } = route.params;

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState('');
  const [tracks, setTracks] = useState([]);
  const [length, setLength] = useState([]);
  const [cover, setCover] = useState('');
  const [albums, setAlbums] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newalbumdata, setNewAlbumData] = useState({ name, year, genres, rating, tracks, length, cover });

  const handleAddAlbum = () => {
    const albumData = SearchAlbum();
    setNewAlbumData(albumData);
    console.log('\n\n\nalbum artist', albumData.year);
  };

  const clearInputFields = () => {
    setName(newalbumdata.name);
    setYear(newalbumdata.year);
    setGenres(newalbumdata.genres);
    setRating(newalbumdata.rating);
    setTracks(newalbumdata.tracks);
    setLength(newalbumdata.length);
    setCover(newalbumdata.cover);
  };

  const SearchUserAlbum = async () => {
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        userId: '65d91cfbf69237517bfc7118',
        search: searchQuery,
        jwtToken: jwt,
      };

      const response = await fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/searchuseralbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, text: ${text}`);
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      const ArtistName = responseData;
      console.log('Response:', '\n\n\n\n', ArtistName[0].name);

      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const UpdateUserRating = async () => {
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        userId: '65d91cfbf69237517bfc7118',
        name: searchQuery,
        rating: 5,
        jwtToken: jwt,
      };

      const response = await fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/updateuserrating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, text: ${text}`);
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      const ArtistName = responseData;
      console.log('Response:', ArtistName);

      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const SearchAlbum = async () => {
    console.log("Trying to send data", searchQuery, jwt);
    try {
      const data = {
        search: searchQuery,
        jwtToken: jwt,
      };

      const response = await fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/searchalbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, text: ${text}`);
      }

      const responseData = await response.json();
      //console.log('Number Of albums: ', responseData.length);
      // const ArtistName = responseData;
      // console.log('Response:', ArtistName);
      // return ArtistName;
      // Update albums state with the response data
      setAlbums([responseData.results]);

      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const addAlbum = () => {

    const data = {

      userId: '65d91cfbf69237517bfc7118',
      name: searchQuery,
      jwtToken: jwt,
    };

    fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/adduseralbum', { // Corrected endpoint URL
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
        console.log('Response:', res);
        if (res.error && res.error.length > 0) {
          setMessage("API Error: " + res.error);
        } else {
          console.log('Album added:', data);
          setMessage('Album has been added');
          handleAddAlbum();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error adding album. Please try again.');
      });
  };

  const handleAlbumPress = (album) => {
    setName(album.name);
    setYear(album.year);
    setGenres(album.genres);
    setRating(album.rating);
    setTracks(album.tracks);
    setLength(album.length);
    setCover(album.cover);
    console.log('Clicked on album:', album);
  };




  // const renderAlbumCover = ({ item }) => (
  //   <TouchableOpacity onPress={() => handleAlbumPress(item)}>
  //     <View style={styles.albumContainer}>
  //       <Text style={styles.albumTitle}>{item.name}</Text>
  //       <Image source={{ uri: item.cover }} style={styles.albumCoverImage} />
  //     </View>
  //   </TouchableOpacity>
  // );

  const renderAlbumCover = ({ album }) => (
    <TouchableOpacity onPress={() => handleAlbumPress(album)}>
      <View style={styles.albumContainer}>
        <Image source={{ uri: album.Cover }} style={styles.albumCoverImage} />
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={({ item: album }) => renderAlbumCover({ album })}
        keyExtractor={(album, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
      />
      <ScrollView style={styles.textContainer}>
        <View>
          {albums.map((album, index) => (
            <View key={index}>
              <Text>Album Information:</Text>
              <Text>Name: {album.Name}</Text>
              <Text>Artist: {album.Artist}</Text>
              <Text>Year: {album.Year}</Text>
              <Text>Tags: {album.Tags.join(', ')}</Text>
              <Text>Tracks:</Text>
              <View>
                {album.Tracks.map((track, index) => (
                  <Text key={index}>{track}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search albums"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.buttonContainer}>
            <Button title="Search" onPress={SearchAlbum} color="grey" />
            <View style={styles.gap} />
            <Button title="Add" onPress={addAlbum} color="grey" />
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C6C6C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#6C6C6C',
    height: 500,
  },
  albumContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    height: '100%',
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumCoverImage: {
    width: 450,
    height: 450,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#C0C0C0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap: {
    width: 10, // Adjust the gap size as needed
  },
});

export default LandingPage;
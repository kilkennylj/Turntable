import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Button } from 'react-native';

class Album {
  constructor(Artist, Year, Cover, Length, Name,  Tags, Tracks) {
    this.Artist = Artist;
    this.Year = Year;
    this.Cover = Cover;
    this.Length = Length;
    this.Name = Name;
    this.Tags = Tags;
    this.Tracks = Tracks;

  }
}

let  calledfromaddalbum = false;
let justloged = true;

const LandingPage = ({ navigation , route}) => {
  

  
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
  const [newalbumdata, setNewAlbumData] = useState({name, year, genres, rating, tracks, length, cover});
  //const albumsofuser = [];
const [albumsofuser, setAlbumsofuser] = useState([]);
const albumarray = new Album;
const [selectedAlbum, setSelectedAlbum] = useState(null);









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
      console.log('Number Of albums: ', responseData.albums.length);

if (justloged === true) {
  const updatedAlbums = responseData.albums.map(albumData => {
    const { Artist, Year, Cover, Length, Name, Tags, Tracks } = albumData;
    return new Album(Artist, Year, Cover, Length, Name, Tags, Tracks);
  });

  // Use a functional update to correctly incorporate previous state
  setAlbumsofuser(prevAlbums => [...prevAlbums, ...updatedAlbums]);
  justloged = false; // Reset the flag after processing
}

      const ArtistName =  responseData;
      //console.log('Response:', '\n\n\n\n', responseData.results);
      //setAlbums([responseData.results]);
      // Update albums state with search results
      //setAlbums(responseData.accessToken);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  if(justloged === true) SearchUserAlbum();


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
      const ArtistName =  responseData;
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



    const  NewAlbum = new Album(responseData.results.Artist, responseData.results.Year,  responseData.results.Cover, responseData.results.Length, responseData.results.Name,  responseData.results.Tags, responseData.results.Tags, responseData.results.Tracks);
    console.log('oBJECT:', NewAlbum.Artist, NewAlbum.Year ,NewAlbum.Cover, NewAlbum.Length, NewAlbum.Name);

    if(calledfromaddalbum === true){
    setAlbumsofuser([...albumsofuser, NewAlbum])
    albumsofuser.forEach(album => console.log(album));
    calledfromaddalbum = false;
    }

    else{
    setAlbums([responseData.results]);
    //console.log('Response:', responseData.results);
    }
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
          console.log('Album added:', res.results);

          calledfromaddalbum = true;
           SearchAlbum([res.results]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error adding album. Please try again.');
      });
  };





  const handleAlbumPress = (album) => {
  setSelectedAlbum(album);
    console.log('Clicked on album:', album);
  };




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
      data={albumsofuser}
      renderItem={({ item: album }) => (
        <TouchableOpacity onPress={() => handleAlbumClick(album)}>
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
          {albumsofuser.map((album, index) => (
            <View key={index}>
              <Text>Album Information:</Text>
              <Text>Name: {selectedAlbum.Name}</Text>
              <Text>Artist: {selectedAlbum.Artist}</Text>
              <Text>Year: {selectedAlbum.Year}</Text>
              <Text>Tags: {selectedAlbum.Tags.join(', ')}</Text>
              <Text>Tracks:</Text>
              <View>
                {selectedAlbum.Tracks.map((track, index) => (
                  <Text key={index}>{track}</Text>
                ))}
              </View>
            </View>
          ))}



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
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    overflow: 'hidden',
    height: '100%',
    marginBottom: 100,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumCoverImage: {
    width: 400,
    height: 400,
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
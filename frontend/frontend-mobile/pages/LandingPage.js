import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

const AlbumCover = ({ album }) => {
  const title = album ? album.title : 'Album 1';

  return (
    <View style={styles.albumContainer}>
      <Text style={styles.albumTitle}>{title}</Text>
      <Image source={require('../assets/album1.png')} style={styles.albumCoverImage} />
    </View>
  );
};

const LandingPage = () => {
  const albums = [
    { id: 1, title: 'Album 1' },
    { id: 2, title: 'Album 2' },
    { id: 3, title: 'Album 3' },
    { id: 4, title: 'Album 4' },
    { id: 5, title: 'Album 5' },
    { id: 6, title: 'Album 6' },
    { id: 7, title: 'Album 7' },
    { id: 8, title: 'Album 8' },
    { id: 9, title: 'Album 9' },
    { id: 10, title: 'Album 10' },
    { id: 11, title: 'Album 1' },
    { id: 12, title: 'Album 2' },
    { id: 13, title: 'Album 3' },
    { id: 14, title: 'Album 4' },
    { id: 15, title: 'Album 5' },
    { id: 16, title: 'Album 6' },
    { id: 17, title: 'Album 7' },
    { id: 18, title: 'Album 8' },
    { id: 19, title: 'Album 9' },
  ];

  const renderAlbumCover = ({ item }) => <AlbumCover album={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={renderAlbumCover}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
      />
      <ScrollView style={styles.textContainer}>
        <Text>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit ametconsectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit ametconsectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit ametconsectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit ametconsectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amet
          interdum purus consectetur. Sed feugiat metus id erat condimentum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia ipsum nec diam dignissim, sit amett`}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  albumContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  albumCoverImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textContent: {
    fontSize: 16,
  },
});

export default LandingPage;

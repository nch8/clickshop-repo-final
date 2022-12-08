import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Pressable,
  
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const {width: windowWidth} = Dimensions.get('window');

const data = [
  {
    id: 'item2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYQ617ewiBOWPzVQsobbzM7FwJIE92-Fqjg&usqp=CAU',
  },
  {
    id: 'item3',
    image: 'https://i.imgur.com/eNuhvpN.jpg',
  },
  {
    id: 'item1',
    image: 'https://i.imgur.com/s7GgEa8.jpg',
  },
  {
    id: 'item6',
    image: 'https://i.imgur.com/1O1Kd6T.jpg',
  },
  {
    id: 'item4',
    image: 'https://i.imgur.com/eNuhvpN.jpg',
  },

  {
    id: 'item5',
    image: 'https://i.imgur.com/jEiBmma.jpg',
  },
];

const ITEM_WIDTH = 0.9 * windowWidth;
const SEPARATOR_WIDTH = 10;

export default function BannCarousel(props) {
  const {style} = props;
  const carouselRef = useRef(null);

  function renderItem({item, index}) {
    const {image, title, url} = item;
    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Image source={{uri: image}} style={styles.image} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        keyExtractor={item => item?.id}
        style={[styles.carousel, style]}
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        itemWidth={ITEM_WIDTH}
        separatorWidth={SEPARATOR_WIDTH}
        inActiveScale={1}
        inActiveOpacity={1}
        containerWidth={windowWidth}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    height: 100,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DADEE1',
    
  },
  carousel: {
    width: windowWidth -35,
    height: ITEM_WIDTH ,
    flexGrow: 0,
  },
  item: {
    backgroundColor: 'yellow',
    height: '100%',
    borderRadius: 0,
    borderColor: '#EAECEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    //width: 200,
    //height:100, //altura de la imagen 
    aspectRatio: 3,
    backgroundColor: '#EBEBEB',
  },

});
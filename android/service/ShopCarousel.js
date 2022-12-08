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
    image: 'https://i.imgur.com/N3nQ9CS.jpg',
    title: 'Peach tea Whiskey Lorem ipsum',
  },
  {
    id: 'item3',
    image: 'https://i.imgur.com/AzdYlDM.jpg',
    title: 'Camera lens Lorem ipsum dolor sit amet',
  },
  {
    id: 'item1',
    image: 'https://i.imgur.com/s7GgEa8.jpg',
    title: 'Shoes Lorem ipsum dolor sit amet',
    url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
  },
  {
    id: 'item6',
    image: 'https://i.imgur.com/1O1Kd6T.jpg',
    title: 'Bottle Opener Lorem ipsum dolor sit amet',
    url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
  },
  {
    id: 'item4',
    image: 'https://i.imgur.com/eNuhvpN.jpg',
    title: 'Modern sunglasses Lorem ipsum dolor sit amet',
    url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
  },

  {
    id: 'item5',
    image: 'https://i.imgur.com/jEiBmma.jpg',
    title: 'Cigarettes pipe Lorem ipsum dolor sit amet',
    url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
  },
];

const ITEM_WIDTH = 0.9 * windowWidth;
const SEPARATOR_WIDTH = ((windowWidth * 0.5));

export default function ShopCarousel(props) {
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
    height: 200,  // altura del contenedor de imagen
    width: 300,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DADEE1',
    marginLeft: windowWidth * 0.02,
    marginRight: windowWidth * 0.02,
  },
  carousel: {
    width: windowWidth -60,
    //height: ITEM_WIDTH + 100,
    flexGrow: 0,
    backgroundColor: 'gray',
  },
  item: {
    backgroundColor: 'yellow',
    height: 250,
    width: 250,
    borderRadius: 5,
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
    //height:200,
    aspectRatio: 1,
    backgroundColor: '#EBEBEB',
  },

});
import React, { useState } from 'react';
import { Dimensions, View, FlatList, Image } from 'react-native';
import Dots from './Dots';

interface Props {
  images: string[];
}

const Carousel = ({ images }: Props) => {
  const pageWidth = Dimensions.get('window').width;

  const [page, setPage] = useState(0);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ width: pageWidth }}>
        <Image
          source={{ uri: item }}
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </View>
    );
  };

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    setPage(newPage);
  };

  return (
    <View
      style={{
        height: 360,
        position: 'relative',
      }}
    >
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={images}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <Dots selectedPage={page} length={images.length} />
    </View>
  );
};

export default Carousel;

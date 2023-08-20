import React, { useState } from 'react';
import { Dimensions, View, FlatList, Image } from 'react-native';
import Dots from './Dots';

interface Props<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

const Carousel = <T extends {}>({ data, renderItem }: Props<T>) => {
  const pageWidth = Dimensions.get('window').width;

  const [page, setPage] = useState(0);

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
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(_, index) => `page__${index}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={{ width: pageWidth }}>{renderItem(item)}</View>
        )}
        snapToInterval={pageWidth}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <Dots selectedPage={page} length={data.length} />
    </View>
  );
};

export default Carousel;

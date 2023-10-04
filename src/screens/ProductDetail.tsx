import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import ScrollContainer from '../components/layout/ScrollContainer';
import AppBar from '../components/ui/AppBar';
import Profile from '../components/productDetail/Profile';
import OtherPostFooter from '../components/productDetail/footer/OtherPostFooter';
import Carousel from '../components/ui/carousel/Carousel';
import ProductInfo from '../components/productDetail/ProductInfo';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';
import { ProductDetail as ProductDetailType } from '../types/interface';
import MyPostFooter from '../components/productDetail/footer/MyPostFooter';
import Description from '../components/productDetail/Description';
import ProductStats from '../components/productDetail/ProductStats';
import Color from '../constants/color';
import BottomSheet from '../components/ui/BottomSheet';
import TYPOS from '../components/ui/typo';
import { ProductStatus } from '../types/interface';
import EtcProductList from '../components/productDetail/EtcProductList';
import Dialog from '../components/ui/Dialog';
import ListValue from '../components/ui/dropdown/ListValue';
import { ToastDispatchContext } from '../components/ui/toast/ToastProvider';
import Home24 from '../components/ui/icons/Home24';
import Share24 from '../components/ui/icons/Share24';
import Burger24 from '../components/ui/icons/Burger24';
import useMenuControl from '../hooks/useMenuControl';
import MenuBackdrop from '../components/ui/dropdown/MenuBackdrop';
import useOverlay from '../hooks/overlay/useOverlay';

export type ProductDetailProps = StackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetail = ({ navigation, route }: ProductDetailProps) => {
  const { id } = route.params;
  const [data, setData] = useState<ProductDetailType | null>(null);
  const burgerRef = useRef<View | null>(null);
  const { isVisibleMenu, closeMenu, openMenu, menuTop } = useMenuControl({
    targetRef: burgerRef,
  });

  const toastDispatch = useContext(ToastDispatchContext);
  const overlay = useOverlay();

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { usedItemBoardInfo },
      } = await axios.get<{
        usedItemBoardInfo: ProductDetailType;
      }>(`/board/used-item/${id}`);

      setData(usedItemBoardInfo);
    };

    fetch();
  }, [id]);

  if (!data) {
    return null;
  }

  const onChangeStatus = async (status: ProductStatus) => {
    try {
      const {
        data: { salesStatus },
      } = await axios.patch<{ salesStatus: ProductStatus }>(
        `/board/used-item/status/${id}`,
        {
          salesStatus: status,
        }
      );

      const clone = { ...data };
      setData({ ...clone, salesStatus });
    } catch (error) {}
  };

  const onLikeChangeHandler = async () => {
    try {
      const {
        data: { isLike, likeCount },
      } = await axios[data.isLike ? 'delete' : 'post']<{
        isLike: boolean;
        likeCount: number;
      }>(`/board/used-item/like/${id}`);

      const clone = { ...data };
      setData({ ...clone, isLike, likeCount });

      if (!data.isLike) {
        toastDispatch?.showToastMessage('관심물품에 추가됐어요.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async () => {
    try {
      await axios.delete(`/board/used-item/${id}`);
      navigation.pop();
    } catch (error) {}
  };

  const STATUS_MAP: ProductStatus[] = ['판매중', '예약중', '거래완료'];

  const handleChatButtonPressed = async () => {
    try {
      const {
        data: { chatRoomId },
      } = await axios.post<{ chatRoomId: string }>('/chat/room', {
        boardId: id,
      });

      navigation.navigate('ChatRoom', { roomId: chatRoomId });
    } catch (error) {}
  };

  const openDeleteDialog = () => {
    overlay.open(
      <Dialog isOpened={true}>
        <Dialog.Content content="게시글을 삭제할까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '삭제',
              onPressHandler: () => {
                overlay.close();
                removePost();
              },
            },
            {
              label: '닫기',
              onPressHandler: overlay.close,
            },
          ]}
        />
      </Dialog>
    );
  };

  const openStatusChangeBottomSheet = () => {
    overlay.open(
      <BottomSheet
        isOpened={true}
        onClose={() => {
          overlay.close();
        }}
        height={280}
        title="상태 변경"
      >
        <View
          style={{
            paddingHorizontal: 24,
            width: '100%',
            height: '100%',
          }}
        >
          {STATUS_MAP.map((text) => (
            <Pressable
              style={{ paddingVertical: 16 }}
              key={text}
              onPress={async () => {
                await onChangeStatus(text);
                overlay.close();
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>{text}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    );
  };

  return (
    <>
      <AppBar
        leftContent={
          <Pressable
            onPress={() => {
              navigation.navigate('BottomNavigation');
            }}
          >
            <Home24 color={Color.black} />
          </Pressable>
        }
        rightContent={
          <>
            <View style={{ flexDirection: 'row' }}>
              <Pressable>
                <Share24 color={Color.black} />
              </Pressable>
              {data.isMe && (
                <>
                  <Pressable
                    onPress={openMenu}
                    ref={burgerRef}
                    style={{ marginLeft: 8 }}
                  >
                    <Burger24 color={Color.black} />
                  </Pressable>
                  <MenuBackdrop
                    isVisible={isVisibleMenu && !!menuTop}
                    close={() => {
                      closeMenu();
                    }}
                    menuStyle={{ top: menuTop, width: 146, right: 16 }}
                  >
                    <ListValue
                      label="글 수정하기"
                      onClickHandler={() => {
                        closeMenu();
                        navigation.navigate('ModifyProduct', {
                          id,
                        });
                      }}
                    />
                    <ListValue
                      label="삭제"
                      onClickHandler={() => {
                        closeMenu();
                        openDeleteDialog();
                      }}
                    />
                  </MenuBackdrop>
                </>
              )}
            </View>
          </>
        }
      />
      <ScrollContainer>
        <Profile
          sellerProfileImage={data.sellerProfileImage}
          address={data.address}
          sellerNickname={data.sellerNickname}
        />
        <Carousel
          data={data.images}
          renderItem={(item: string) => (
            <Image
              source={{ uri: item }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
          )}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ marginTop: 16 }} />
          <ProductInfo
            timeDelta={data.timeDelta}
            title={data.title}
            subCategory={data.subCategory}
            salesStatus={data.salesStatus}
            price={data.price}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.neutral4,
              marginVertical: 24,
            }}
          />
          <Description description={data.description} />
          <View style={{ marginTop: 16 }} />
          <ProductStats
            likeCount={data.likeCount}
            viewCount={data.viewCount}
            chatCount={data.chatCount}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.neutral4,
              marginVertical: 24,
            }}
          />
        </View>
        <EtcProductList
          isMe={data.isMe}
          boardId={id}
          sellerNickname={data.sellerNickname}
        />
      </ScrollContainer>
      {data.isMe ? (
        <MyPostFooter onStatusChangeHandler={openStatusChangeBottomSheet} />
      ) : (
        <OtherPostFooter
          onLikeChangeHandler={onLikeChangeHandler}
          isLike={data.isLike}
          handleChatButtonPressed={handleChatButtonPressed}
        />
      )}
    </>
  );
};

export default ProductDetail;

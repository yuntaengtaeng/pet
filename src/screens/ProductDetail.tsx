import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
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
import useModal from '../hooks/useModal';
import BottomSheet from '../components/ui/BottomSheet';
import TYPOS from '../components/ui/typo';
import { ProductStatus } from '../types/interface';
import EtcProductList from '../components/productDetail/EtcProductList';
import Share from '../components/ui/icons/Share';
import Burger from '../components/ui/icons/Burger';
import Home from '../components/ui/icons/Home';
import SHADOWS from '../components/ui/shadow';
import Dialog from '../components/ui/Dialog';
import ListValue from '../components/ui/dropdown/ListValue';

export type ProductDetailProps = StackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetail = ({ navigation, route }: ProductDetailProps) => {
  const { id } = route.params;
  const [data, setData] = useState<ProductDetailType | null>(null);
  const { isVisible, closeModal, openModal } = useModal();
  const [dropdownTop, setDropdownTop] = useState(0);
  const burgerRef = useRef<View | null>(null);
  const {
    isVisible: isVisibleDropdown,
    closeModal: closeDropdown,
    openModal: openDropdown,
  } = useModal();
  const {
    isVisible: isVisibleDeleteModal,
    closeModal: closeDeleteModel,
    openModal: openDeleteModal,
  } = useModal();

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

  useEffect(() => {
    if (!isVisibleDropdown) {
      return;
    }

    burgerRef.current?.measure((_x, _y, _width, height, pageX, pageY) => {
      setDropdownTop(pageY + height + 8);
    });
  }, [isVisibleDropdown]);

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

      closeModal();
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

  return (
    <>
      <AppBar
        leftContent={
          <Pressable
            onPress={() => {
              navigation.navigate('BottomNavigation');
            }}
          >
            <Home size={24} color={Color.black} />
          </Pressable>
        }
        rightContent={
          <>
            <View style={{ flexDirection: 'row' }}>
              <Pressable>
                <Share size={24} color={Color.black} />
              </Pressable>
              {data.isMe && (
                <>
                  <Pressable
                    onPress={openDropdown}
                    ref={burgerRef}
                    style={{ marginLeft: 8 }}
                  >
                    <Burger size={24} color={Color.black} />
                  </Pressable>
                  <Modal
                    visible={isVisibleDropdown}
                    transparent
                    animationType="fade"
                  >
                    <TouchableWithoutFeedback onPress={closeDropdown}>
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={[
                            {
                              width: 146,
                              position: 'absolute',
                              zIndex: 10,
                              top: dropdownTop,
                              borderRadius: 8,
                              right: 16,
                              backgroundColor: Color.white,
                              flexDirection: 'column',
                            },
                            SHADOWS.shadow4,
                          ]}
                        >
                          <ListValue
                            label="글 수정하기"
                            onClickHandler={() => {
                              closeDropdown();
                              navigation.navigate('ModifyProduct', {
                                id,
                              });
                            }}
                          />
                          <ListValue
                            label="삭제"
                            onClickHandler={() => {
                              closeDropdown();
                              openDeleteModal();
                            }}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
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
        <Carousel images={data.images} />
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
        <MyPostFooter onStatusChangeHandler={openModal} />
      ) : (
        <OtherPostFooter
          onLikeChangeHandler={onLikeChangeHandler}
          isLike={data.isLike}
        />
      )}
      <BottomSheet
        isOpened={isVisible}
        onClose={() => {
          closeModal();
        }}
        height={280}
      >
        <View
          style={{
            paddingHorizontal: 24,
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ paddingVertical: 16 }}>
            <Text style={[TYPOS.headline3, { color: Color.black }]}>
              상태변경
            </Text>
          </View>
          {STATUS_MAP.map((text) => (
            <Pressable
              style={{ paddingVertical: 16 }}
              key={text}
              onPress={() => {
                onChangeStatus(text);
              }}
            >
              <Text style={[TYPOS.body1, { color: Color.black }]}>{text}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>
      <Dialog isOpened={isVisibleDeleteModal}>
        <Dialog.Content content="게시글을 삭제할까요?" />
        <Dialog.Buttons
          buttons={[
            {
              label: '삭제',
              onPressHandler: () => {
                removePost();
              },
            },
            {
              label: '닫기',
              onPressHandler: closeDeleteModel,
            },
          ]}
        />
      </Dialog>
    </>
  );
};

export default ProductDetail;

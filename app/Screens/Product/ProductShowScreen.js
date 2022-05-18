import React, {useContext, useState, useMemo} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import AppContainer from '../../AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';
import tw from '../../../tailwind';
import Swiper from 'react-native-swiper';
import {map, first, uniqBy, isEmpty, isNull, filter, size} from 'lodash';
import FastImage from 'react-native-fast-image';
import {useForm} from 'react-hook-form';
import {checkCartBeforeAdd} from '../../Redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {getConvertedFinalPrice, getWhatsappLink} from '../../Constants/helpers';
import {Input} from 'postcss';
import AlertMessage from '../Components/AlertMessage';

export default function () {
  const {product, locale, settings, currency, currencies} = useSelector(
    state => state,
  );
  const [localCurrency, setLocalCurrency] = useState(
    first(filter(currencies, c => c.country.is_local)),
  );
  const {
    getLocalized,
    getLarge,
    getThumb,
    mainBgColor,
    currentFont,
    titleOneClass,
    mainColor,
    trans,
    classNames,
    textColor,
  } = useContext(AppContext);
  const [currentImages, setCurrentImages] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [filteredColorsGroup, setFilteredColorsGroup] = useState([]);
  const [filteredSizesGroup, setFilteredSizesGroup] = useState([]);
  const [currentQty, setCurrentQty] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const {data, setData, post, progress} = useForm({
    type: 'product',
    cart_id: null,
    element_id: product.id,
    qty: selectedQty,
    price: finalPrice,
    direct_purchase: product.direct_purchase,
  });

  useMemo(() => {
    if (product.has_attributes) {
      setFinalPrice(first(product.product_attributes).price);
      setSelectedColor(first(product.product_attributes).color_id);
      setSelectedSize(first(product.product_attributes).size_id);
      setCurrentQty(first(product.product_attributes).qty);

      setFilteredColorsGroup(uniqBy(product.product_attributes, 'color_id'));
      setFilteredSizesGroup(uniqBy(product.product_attributes, 'size_id'));
    } else {
      setFinalPrice(product.isOnSale ? product.sale_price : product.price);
      setSelectedColor(product.color_id);
      setSelectedSize(product.size_id);
      setCurrentQty(product.qty);
    }
  }, []);

  useMemo(() => {
    if (!isNull(selectedAttribute) && product.has_attributes) {
      setFinalPrice(selectedAttribute.price);
      setCurrentQty(1);
      setCurrentQty(selectedAttribute.qty);
    }
  }, [selectedAttribute]);

  // select Color then select size --> show qty
  useMemo(() => {
    setFilteredSizesGroup(
      filter(product.product_attributes, c => c.color_id === selectedColor),
    );
    setSelectedAttribute(
      first(
        filter(product.product_attributes, c => c.color_id === selectedColor),
      ),
    );
    setSelectedQty(0);
  }, [selectedColor]);

  useMemo(() => {
    if (!isEmpty(filteredSizesGroup) && product.has_attributes) {
      setSelectedSize(first(filteredSizesGroup).size_id);
      setSelectedQty(0);
    }
  }, [filteredSizesGroup]);

  useMemo(() => {
    if (!isEmpty(filteredSizesGroup) && product.has_attributes) {
      setSelectedAttribute(
        first(
          filter(
            product.product_attributes,
            a => a.color_id === selectedColor && a.size_id === selectedSize,
          ),
        ),
      );
    } else if (product.has_attributes) {
      setSelectedAttribute(first(product.product_attributes));
    } else {
    }
    setSelectedQty(0);
  }, [selectedSize]);

  useMemo(() => {
    const images = [];
    product.video_url_one
      ? images.push({
          thumbnail: getLarge(product.image),
          original: getLarge(product.image),
          embedUrl: product.video_url_one,
          description: product[getLocalized('caption')],
          loading: 'lazy',
          // renderItem: () => <EmbeddedIFrameVideo videoUrl={product.video_url_one}/>
        })
      : null;
    images.push({
      thumbnail: getLarge(product.image),
      original: getLarge(product.image),
      description: product[getLocalized('caption')],
      loading: 'lazy',
    });
    map(product.images, img => {
      images.push({
        thumbnail: getLarge(img.image),
        original: getLarge(img.image),
        description: img[getLocalized('caption')],
        loading: 'lazy',
      });
    });
    setCurrentImages(images);
  }, [product]);

  const handleSubmit = () => {
    dispatch(
      checkCartBeforeAdd({
        cart_id: `${product.id}${
          product.has_attributes ? selectedAttribute.id : ''
        }`,
        type: 'product',
        element_id: product.id,
        qty: selectedQty,
        price:
          product.has_attributes && !product.isOnSale
            ? parseFloat(finalPrice)
            : parseFloat(product.isOnSale ? product.sale_price : product.price),
        direct_purchase: product.direct_purchase,
        shipmentFees: 0,
        image: product.image,
        name_ar: product.name_ar,
        name_en: product.name_en,
        description_ar: product.description_ar,
        description_en: product.description_en,
        merchant_id: product.user.id,
        merchant_name_ar: product.user.name_ar,
        merchant_name_en: product.user.name_en,
        color: product.has_attributes
          ? selectedAttribute.color[getLocalized()]
          : product.color[getLocalized()],
        size: product.has_attributes
          ? selectedAttribute.size[getLocalized()]
          : product.size[getLocalized()],
        attribute_id: `${product.has_attributes ? selectedAttribute.id : ''}`,
      }),
    );
  };

  const increaseQty = () => {
    setSelectedQty(selectedQty < currentQty ? selectedQty + 1 : selectedQty);
  };

  const decreaseQty = () => {
    setSelectedQty(
      selectedQty - 1 < currentQty && selectedQty > 0
        ? selectedQty - 1
        : selectedQty,
    );
  };

  return (
    <AppContainer>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={tw`rounded-t-lg mb-2 h-132`}>
          <Swiper
            autoplay={false}
            dotColor={tw.color(`text-${mainColor}-400`)}
            activeDotColor={tw.color(`text-${mainColor}-900`)}
            // showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            bounces={true}>
            {map(currentImages, (s, index) => (
              <Pressable onPress={() => console.log('s', s)} key={index}>
                <FastImage
                  source={{uri: s.thumbnail}}
                  style={tw`w-auto h-132 rounded-lg`}
                  resizeMode={`cover`}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
        <View style={tw`bg-white dark:bg-transparent rounded-md px-5 `}>
          <View style={tw`flex flex-1 flex-col justify-between items-center`}>
            {!isNull(product[getLocalized('caption')]) &&
              size(product[getLocalized('caption')]) > 5 && (
                <View style={tw`mt-0 w-full`}>
                  <Text style={tw` ${textColor}`}>{trans('caption')}</Text>
                  <Text
                    style={tw`text-left text-${mainColor}-800 dark:text-${mainColor}-100`}>
                    {product[getLocalized('caption')]}
                  </Text>
                </View>
              )}
            {!isNull(product.sku) && (
              <View style={tw`flex mt-0`}>
                <Text
                  style={tw` ${currentFont} text-left text-${mainColor}-800 dark:text-${mainColor}-100`}>
                  {trans('reference_id')} :{product.sku}
                </Text>
              </View>
            )}
            {!isEmpty(currency) &&
              !currency.country?.is_local &&
              !product.free && (
                <View
                  style={tw`flex flex-row flex-1 justify-between items-start m-2`}>
                  <Text
                    style={tw`${
                      product.isOnSale ? `line-through` : ``
                    } mt-1  ${textColor}`}>
                    {getConvertedFinalPrice(
                      finalPrice,
                      localCurrency.exchange_rate,
                    )}{' '}
                    {localCurrency[getLocalized('currency_symbol')]}
                  </Text>
                  {product.isOnSale && !product.free && (
                    <Text
                      style={tw`mt-1  text-red-800 dark:text-red-400 text-sm sm:text-lg`}>
                      {getConvertedFinalPrice(
                        product.sale_price,
                        localCurrency.exchange_rate,
                      )}{' '}
                      {localCurrency[getLocalized('currency_symbol')]}
                    </Text>
                  )}
                </View>
              )}
          </View>

          {/* product attributes */}
          <View style={tw`flex flex-1 flex-col w-full mt-6`}>
            {!product.is_available && (
              <AlertMessage
                title={trans('element_is_not_available')}
                message={trans('element_is_not_available_currently_for_order')}
              />
            )}
            {product.has_attributes && !isEmpty(filteredColorsGroup) ? (
              // multi attributes
              <View
                style={tw`flex flex-col justify-between items-center gap-x-5`}>
                {/* Color picker */}
                <View style={tw`flex-1 w-full`}>
                  <View
                    style={tw`flex w-full flex-row justify-between items-center `}>
                    <Text
                      style={tw`text-sm font-bold text-${mainColor}-800 dark:text-white`}>{`${trans(
                      'colors',
                    )} / ${trans('heights')}`}</Text>
                    {product.show_size_chart ? (
                      <View style={tw`justify-end items-center`}>
                        <Pressable
                          onPress={() => setShowModal(true)}
                          style={tw`flex flex-row items-center justify-center text-xs font-bold text-${mainColor}-800 dark:text-${mainColor}-100 hover:text-${mainColor}-800 dark:text-${mainColor}-100 dark:hover:text-${mainColor}-200 capitalize p-2 rounded-md  border-${mainBgColor}-100 bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600`}>
                          <Icon name={`mobile`} size={20} color={`red`} />
                          <Text>{trans('size_chart')}</Text>
                        </Pressable>
                      </View>
                    ) : null}
                  </View>
                  <View style={tw`mt-4`}>
                    <Text style={tw``}>{trans('choose_color')}</Text>
                    <View
                      style={tw`flex flex-row items-center justify-between`}>
                      {filteredColorsGroup.map(attribute => (
                        <Pressable
                          onPress={() => setSelectedColor(attribute.color_id)}
                          key={attribute.color.name_ar}
                          value={attribute.color_id}
                          // value={selectedColor}
                          style={tw` ${
                            selectedColor == attribute.color_id
                              ? `border-${mainColor}-100 dark:border-${mainColor}-800`
                              : `border-${mainColor}-100 dark:border-${mainColor}-800`
                          }  h-20 w-20 
                                                            -m-0.5 relative p-0.5 rounded-full flex items-center justify-center  focus:outline-none hover:bg-${mainBgColor}-400`}>
                          <View
                            style={tw`text-${mainColor}-800 dark:text-${mainColor}-100 font-bold text-sm mx-2`}>
                            <Text>{attribute.color[getLocalized()]}</Text>
                          </View>
                          <View
                            style={[
                              tw`h-8 w-8 border border-black border-opacity-10 rounded-full`,
                              {backgroundColor: attribute.color.code},
                            ]}
                          />
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>

                {/* Size picker */}
                <View style={tw`flex-1 w-full mt-4`}>
                  <View style={tw`flex items-center justify-between`}>
                    <Text
                      style={`text-sm font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}>
                      {trans('sizes')}
                    </Text>
                  </View>

                  <View style={tw`mt-4`}>
                    <Text style={tw``}>{trans('choose_size')}</Text>
                    <View style={tw`grid grid-cols-3 gap-3 sm:grid-cols-6`}>
                      {filteredSizesGroup.map(attribute => (
                        <Pressable
                          onPress={() => setSelectedSize(attribute.size_id)}
                          key={attribute.size.name_ar}
                          value={attribute.size_id}
                          // value={selectedSize}
                          style={({active, checked}) =>
                            tw`${
                              attribute.size
                                ? ` focus:outline-none`
                                : `opacity-25 cursor-not-allowed`
                            }
                                                            ${
                                                              active
                                                                ? `ring-2 ring-offset-2 ring-${mainColor}-200 dark:ring-${mainColor}-800`
                                                                : ``
                                                            }
                                                            ${
                                                              checked
                                                                ? `bg-${mainColor}-400 dark:bg-${mainColor}-400 border-transparent ${textColor} hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                                : `bg-${mainBgColor} border-gray-200 text-${mainColor}-800 dark:text-${mainColor}-200 hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                            }
                                                            border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate`
                          }
                          disabled={!attribute.size}>
                          <Text>{attribute.size[getLocalized()]}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <>
                {/* single  attribute */}
                {product.show_attribute && (
                  <View
                    style={tw`flex flex-row justify-between items-center gap-x-5`}>
                    <View style={tw`mt-2 lg:col-span-5 w-full`}>
                      {/* Color picker */}
                      <View>
                        <View
                          style={tw`flex w-full flex-1 flex-row justify-between items-center`}>
                          <Text
                            style={tw`text-sm font-bold text-${mainColor}-800 dark:text-white capitalize`}>
                            {trans('color')}
                          </Text>
                          <View>
                            {product.show_size_chart ? (
                              <View style={tw`justify-end items-center`}>
                                <Pressable
                                  onPress={() => setShowModal(true)}
                                  style={tw`flex flex-row items-center justify-center text-xs font-bold text-${mainColor}-800 dark:text-${mainColor}-100 hover:text-${mainColor}-800 dark:text-${mainColor}-100 dark:hover:text-${mainColor}-200 capitalize p-2 rounded-md border-2 border-${mainBgColor}-100 bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600`}>
                                  <View>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={tw`h-6 w-6 mx-1`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </View>
                                  <Text>{trans('size_chart')}</Text>
                                </Pressable>
                              </View>
                            ) : null}
                          </View>
                        </View>

                        <View
                          value={selectedColor}
                          onChange={setSelectedColor}
                          style={tw`mt-4`}>
                          <Text>{trans('choose_color')}</Text>
                          <View style={tw`flex items-center gap-x-3`}>
                            <View
                              key={product.color.name_ar}
                              value={product.color_id}
                              style={({active, checked}) =>
                                tw`${
                                  active && checked
                                    ? `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`
                                    : `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`
                                }
                                                                    ${
                                                                      !active &&
                                                                      checked
                                                                        ? `ring-2 ring-${mainColor}-100 dark:ring-${mainColor}-800`
                                                                        : `ring-2 ring-${mainColor}-200 dark:ring-${mainColor}-600`
                                                                    }
                                                                    -m-0.5 relative p-0.5 rounded-full flex items-center justify-center  focus:outline-none hover:bg-${mainBgColor}-400`
                              }>
                              <View
                                style={tw`text-${mainColor}-800 dark:text-${mainColor}-100 font-bold text-sm mx-2`}>
                                <Text>{product.color[getLocalized()]}</Text>
                              </View>
                              <View
                                // style={{backgroundColor: product.color.code}}
                                style={tw`h-8 w-8 border border-black border-opacity-10 rounded-full`}
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      {/* Size picker */}
                      <View style={tw`mt-4`}>
                        <View style={tw`flex items-center justify-between`}>
                          <Text
                            style={tw`text-sm font-bold text-${mainColor}-900 dark:text-white capitalize`}>
                            {trans('size')}
                          </Text>
                        </View>

                        <View
                          value={selectedSize}
                          onChange={setSelectedSize}
                          style={tw`mt-4`}>
                          <Text>{trans('choose_size')}</Text>
                          <View
                            style={tw`grid grid-cols-3 gap-3 sm:grid-cols-6`}>
                            <View
                              key={product.size.name_ar}
                              value={product.size_id}
                              style={({active, checked}) =>
                                tw`
                                                                    ${
                                                                      product.size
                                                                        ? ' focus:outline-none'
                                                                        : 'opacity-25 cursor-not-allowed'
                                                                    }
                                                                    ${
                                                                      active
                                                                        ? `ring-2 ring-offset-2 ring-${mainColor}-200 dark:ring-${mainColor}-800`
                                                                        : ''
                                                                    }
                                                                    ${
                                                                      checked
                                                                        ? `bg-${mainColor}-400 dark:bg-${mainColor}-400 border-transparent ${textColor} hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                                        : `${mainBgColor} border-gray-200 text-${mainColor}-800 dark:text-${mainColor}-200 hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                                    }
                                                                    border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate`
                              }
                              disabled={!product.size}>
                              <Text>{product.size[getLocalized()]}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
            {product.is_available ? (
              <View style={tw`flex flex-col my-6`}>
                <View style={tw`w-full`}>
                  <Text style={tw`${textColor}`}>{trans('notes')}</Text>
                  <View style={tw`mt-1`}>
                    {/*<Input*/}
                    {/*    id="notes"*/}
                    {/*    name="notes"*/}
                    {/*    rows={3}*/}
                    {/*    maxLength={150}*/}
                    {/*    className={`text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border border-gray-300 rounded-md`}*/}
                    {/*    onChange={(e) => setNotes(e.target.value)}*/}
                    {/*/>*/}
                  </View>
                  <Text style={tw`mt-2 ${textColor}`}>
                    {trans('u_can_write_notes_related_to_product_ordered')}
                  </Text>
                </View>
                <View
                  style={tw`flex flex-1 w-full justify-center items-center mx-auto mt-5`}>
                  <View
                    style={tw`relative z-0 inline-flex justify-between shadow-sm rounded-md h-20`}>
                    <Pressable
                      onPress={() => increaseQty()}
                      style={tw`
                                                    ${
                                                      locale.isRTL
                                                        ? `rounded-r-md`
                                                        : `rounded-l-md`
                                                    }
                                                    relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}>
                      <Text style={tw``}>+</Text>
                    </Pressable>
                    <Pressable
                      style={tw`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xl font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}>
                      <Text>{selectedQty}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => decreaseQty()}
                      style={tw`
                                                    ${
                                                      locale.isRTL
                                                        ? `rounded-l-md`
                                                        : `rounded-r-md`
                                                    }
                                                    -ml-px relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}>
                      <Text>-</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : null}

            {/* add_to_cart_btn */}
            <View
              style={tw`flex flex-row justify-between items-center gap-x-5 mt-5`}>
              {settings.enable_cart && (
                <Pressable
                  onPress={() => handleSubmit()}
                  style={tw`grow`}
                  disabled={
                    !product.is_available || finalPrice === 0 || selectedQty < 1
                  }>
                  <View
                    style={tw`
                                                ${
                                                  !product.is_available ||
                                                  finalPrice === 0 ||
                                                  selectedQty < 1
                                                    ? `opacity-30 text-white`
                                                    : `opacity-100 bg-${mainColor}-600 text-white dark:text-black dark:bg-${mainColor}-400`
                                                }
                                                flex flex-1 bg-${mainColor}-800 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium ${textColor} hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`}>
                    <Text>{trans('add_to_cart')}</Text>
                  </View>
                </Pressable>
              )}
            </View>
            {settings.enable_whatsapp_contact && (
              <View
                style={tw`flex flex-1 w-full mb-auto mt-5 justify-between opacity-80`}>
                <Pressable
                  href={getWhatsappLink(
                    settings.whatsapp,
                    `${trans('contactus_to_inquire_about_product')} ${trans(
                      'name',
                    )} : ${product[getLocalized()]} - ${trans(`sku`)} : ${
                      product.sku
                    }`,
                  )}
                  style={tw`${
                    !product.is_available ? `opacity-30` : `bg-green-950`
                  }
                                            btn flex flex-1 justify-between bg-green-950 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-500 sm:w-full`}>
                  <Text>{trans('contactus_through_whatsapp')}</Text>
                </Pressable>
              </View>
            )}
          </View>

          <Text style={tw`${textColor} text-xl my-3`}>
            {product[getLocalized()]}
          </Text>
          <Text style={tw`${textColor} text-xl my-3`}>
            {product[getLocalized('description')]}
          </Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

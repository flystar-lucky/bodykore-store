import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { mapCheckout } from '@utils/checkout';
import Cookies from 'js-cookie';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';

interface Option {
  title: string;
  id: string;
  price: string;
  prevPrice?: string;
  img?: string;
  available: boolean;
}

interface SingleProductProps {
  affirmMonthly?: string;
  affirmTax?: string;
  affirmLogo?: string;
  rating: number;
  numReviews: number;
  description?: string;
  shippingCost?: string;
  options: Option[];
  reviewOnClick: () => void;
}

const SingleProduct = ({
  affirmMonthly,
  affirmTax,
  affirmLogo,
  rating,
  numReviews,
  description,
  shippingCost,
  options,
  reviewOnClick,
}: SingleProductProps) => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setcheckoutUrl = useSetRecoilState(checkoutUrlState);
  const setCartTotal = useSetRecoilState(cartTotalState);

  const [selected, setSelected] = useState(0);

  const multipleOptions = !(
    options.length === 1 && options[0].title === 'Default Title'
  );

  const addProduct = async () => {
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    let checkout;
    if (checkoutId !== undefined) {
      const res = await addItemToCheckout(checkoutId, options[selected].id);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(options[selected].id, email);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
        Cookies.set('checkoutId', checkout.id, { expires: 90 });
      }
    }
    if (checkout !== undefined) {
      setCartItems(mapCheckout(checkout));
      setcheckoutUrl(checkout.webUrl);
      setCartTotal(checkout.subtotalPriceV2.amount);
    } else {
      console.error('Failed to add product');
    }
  };

  const mapRating = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <Image
          src={Math.round(rating) > i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
          width={11}
          height={10}
          key={i}
          alt=""
        />
      );
    }
    return arr;
  };

  return (
    <section className="max-w-7xl m-auto">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bebas italic font-bold text-3xl text-black-373933">
            ${(+options[selected].price).toFixed(2)}
          </h1>
          {options[selected].prevPrice !== undefined ? (
            <h1 className="font-roboto italic text-lg text-red-bc2026 line-through pr-4">
              ${(+(options[selected].prevPrice as string)).toFixed(2)}
            </h1>
          ) : null}
        </div>
        <div className="flex items-center gap-6 w-52">
          <Image src="/svg/share.svg" width="23" height="15" alt="" />
          <Image src="/svg/instagram.svg" width="16" height="16" alt="" />
          <Image src="/svg/facebook.svg" width="9" height="16" alt="" />
          <Image src="/svg/twitter.svg" width="18" height="15" alt="" />
        </div>
      </div>

      <p className="font-roboto text-xs text-black-373933">As low as</p>
      <div className="flex items-center gap-2">
        <h1 className="font-bebas font-bold text-5xl">{affirmMonthly}</h1>
        <h1 className="font-bebas font-bold text-3xl">{affirmTax}</h1>
        <img className="h-10" src={affirmLogo} alt="" />
      </div>

      <div className="flex justify-center items-center lg:justify-start pb-2 gap-1">
        {mapRating()}
        <p className="text-red-bc2026 font-roboto font-bold text-sm pl-2">
          {rating.toFixed(1)}
        </p>
        <button
          className="text-grey-8C8C8C font-roboto text-xs pl-5"
          onClick={reviewOnClick}
        >
          {numReviews} reviews \ Write a Review
        </button>
      </div>

      <p className="font-roboto text-sm">{description}</p>

      {multipleOptions ? (
        <div className="w-full py-4">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left text-gray-700 bg-gray-100 rounded-lg border border-red-bc2026 cursor-default focus:bg-white focus:border-gray-500">
                <span className="block truncate">
                  <div className="flex gap-8 items-center pl-3">
                    <img
                      src={options[selected].img}
                      alt=""
                      className="h-8 w-12"
                    />
                    {options[selected].title}
                  </div>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                        }`
                      }
                      value={index}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            <div className="flex items-center gap-8">
                              <img src={item.img} alt="" className="h-8 w-12" />
                              {item.title}
                            </div>
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      ) : null}

      <p className="font-roboto text-sm">{shippingCost}</p>
      <p className="text-grey-8C8C8C font-roboto text-xs pt-1">
        The final shipping cost will be apply in the check out page
      </p>
      <button
        className={`w-full h-12 mt-6 mb-2 border-2 border-black-373933 rounded-md font-bebas ${
          options[selected].available
            ? 'bg-black-373933 text-white'
            : 'cursor-default'
        }`}
        style={{ letterSpacing: '1.5px' }}
        onClick={addProduct}
        disabled={!options[selected].available}
      >
        <div className="flex justify-center items-center">
          <h1 className="mr-2">
            {options[selected].available ? 'ADD TO CART' : 'OUT OF STOCK'}
          </h1>
        </div>
      </button>
    </section>
  );
};

export default SingleProduct;

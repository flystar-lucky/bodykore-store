import { mapCheckout } from '@utils/checkout';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import {
  removeItemFromCheckout, updateQuantityCheckout
} from 'services/shopify/storefront';
import { cartItemsState, cartTotalState } from 'state/atoms';

export interface SingleItemCartProps {
  available: boolean;
  shippingDays?: number;
  name: string;
  option?: string;
  price: number;
  amount: number;
  image?: string;
  lineId: string;
  cartId: string;
}
// Changed option to indicate selected variant.
// Changed amount to indicate quantity in the cart,
// change the selector UI to a number input.

export default function SingleCartItem({
  available,
  shippingDays,
  name,
  option,
  price,
  amount,
  image,
  lineId,
  cartId,
}: SingleItemCartProps) {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setCartTotal = useSetRecoilState(cartTotalState);

  const removeLine = async () => {
    const res = await removeItemFromCheckout(cartId, lineId);
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
    }
  };

  const updateLine = async (quantity: number) => {
    if (quantity === 0) {
      // Dont allow 0 to avoid accidental removal,
      // as the item would disapear from the cart
      return;
    }
    const res = await updateQuantityCheckout(cartId, lineId, quantity);
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
    }
  };
  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1 justify-center items-center relative">
          {image ? (
            <Image src={image} layout="fill" objectFit="contain" alt="" />
          ) : null}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <p className="font-bold">{name}</p>
            <p className="text-xs">
              {option !== 'Default Title' ? option : null}
            </p>
            <p className="font-bold">${price.toFixed(2)}</p>
          </div>
          <div className="flex gap-4">
            {/* Icon tick (available) or clock (not available) */}
            {available ? '' : ''}
            <p>In Stock</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs">Quantity</p>
            {/* <GenericDropdown values={amounts} /> */}
            {/* Changed to a simple integer input as the dropdown didnt make sense*/}
            <input
              className="w-20 text-gray-700 py-1 px-4 pr-4 leading-tight"
              type={'number'}
              min="1"
              step="1"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              defaultValue={amount}
              onChange={(event) => {
                updateLine(+event.target.value);
              }}
            ></input>
          </div>
          <div>
            <button onClick={removeLine}>Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}

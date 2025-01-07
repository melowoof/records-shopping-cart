import { DetailedAlbumObject } from "./interfaces";

const cart = new Map();

export function addToCart(
  itemObject: DetailedAlbumObject,
  itemId: string,
  amount: number
) {
  if (cart.has(itemId)) {
    const existingItem = cart.get(itemId);
    existingItem.amount += amount;
  } else {
    cart.set(itemId, { ...itemObject, amount: amount });
  }
}

export function removeFromCart(itemId: string) {
  if (cart.has(itemId)) {
    cart.delete(itemId);
  } else {
    console.log(`${itemId} not found in cart`);
  }
}

export function increaseAmount(itemId: string) {
  if (cart.has(itemId)) {
    const existingItem = cart.get(itemId);
    existingItem.amount += 1;
  } else {
    console.log(`Item with ID ${itemId} not found in cart`);
  }
}

export function decreaseAmount(itemId: string) {
  if (cart.has(itemId)) {
    const existingItem = cart.get(itemId);
    if (existingItem.amount > 1) {
      existingItem.amount -= 1;
    } else {
      existingItem.amount = 1;
    }
  } else {
    console.log(`Item with ID ${itemId} not found in cart`);
  }
}

export function getCartSize() {
  let totalSize = 0;
  cart.forEach((item) => {
    totalSize += item.amount;
  });
  return totalSize;
}

export function getCart() {
  return cart;
}

export function getItem(itemId: string): DetailedAlbumObject | null {
  if (cart.has(itemId)) {
    const item = cart.get(itemId);
    return item;
  }
  return null;
}

export function getItemCount(itemId: string) {
  if (cart.has(itemId)) {
    const item = cart.get(itemId);
    return item.amount;
  }
}

export function getTotalPrice() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.amount;
  });
  return Math.floor(totalPrice * 100) / 100;
}

export const mockCart = new Map([
  [
    1,
    {
      id: 1,
      albumName: "Eusexua",
      artistName: "FKA Twigs",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e029e97a65dbd7ffdff93e3652c",
      amount: 2,
      price: 8.99,
    },
  ],
  [
    2,
    {
      id: 2,
      albumName: "Powders",
      artistName: "Eartheater",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e0280735f1f29ee8ee7325e3305",
      amount: 1,
      price: 8.99,
    },
  ],
  [
    3,
    {
      id: 3,
      albumName: "Norman Fucking Rockwell!",
      artistName: "Lana Del Rey",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e02879e9318cb9f4e05ee552ac9",
      amount: 4,
      price: 8.99,
    },
  ],
]);

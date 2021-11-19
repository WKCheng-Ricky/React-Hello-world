import { useState } from "react";
import { getAllItems } from "./core.ts";

interface LineItem {
  item: string;
  quantity: number;
}

const ShopItem: React.FC<{
  item: Item;
  onAdd: () => void;
}> = function ({ item, onAdd }) {
  const { title, price, description } = item;
  return (
    <div>
      <p>Item: {title}</p>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <button onClick={onAdd}> Add to shopping cart</button>
    </div>
  );
};

const CartItem: React.FC<{
  item: LineItem;
  onRemove: () => void;
  onAdd: () => void;
  onSub: () => void;
}> = function ({ item: lineitem, onRemove, onAdd, onSub }) {
  const { item, quantity } = lineitem;
  return (
    <div>
      <p>Item ID: {item}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={onRemove}>Remove item</button>
      <button onClick={onAdd}>+</button>
      <button onClick={onSub}>-</button>
    </div>
  );
};

const Demo: React.FC = function () {
  const [cart, setCart] = useState<LineItem[]>([]);
  const shopItems = getAllItems();

  function addItemToCart(item: Item) {
    const this_id = item.id;
    const isExist = cart.find(({ item }) => item === this_id);
    const foundIndex = cart.findIndex(({ item }) => item === this_id);

    if (isExist == null) {
      setCart([...cart, { item: item.id, quantity: 1 }]);
    } else {
      cart.splice(foundIndex, 1);
      setCart([...cart, { item: item.id, quantity: isExist.quantity + 1 }]);
    }
  }

  function addItem(index: number) {
    const isExist = cart[index];
    cart.splice(index, 1);
    setCart([...cart, { item: isExist.item, quantity: isExist.quantity + 1 }]);
  }

  function subItem(index: number) {
    const isExist = cart[index];
    if (isExist.quantity - 1 >= 1) {
      cart.splice(index, 1);
      setCart([
        ...cart,
        { item: isExist.item, quantity: isExist.quantity - 1 }
      ]);
    }
  }

  function removeItem(index: number) {
    cart.splice(index, 1);
    setCart([...cart]);
  }

  function removeAll() {
    cart.splice(0, cart.length);
    setCart([...cart]);
  }

  return (
    <div>
      <p> Items: </p>
      {shopItems.map((item) => (
        <ShopItem key={item.id} item={item} onAdd={() => addItemToCart(item)} />
      ))}
      <p> Cart items: </p>
      <button onClick={() => removeAll()}>Remove all item in cart?</button>
      {cart.map((item, index) => (
        <CartItem
          key={item.item}
          item={item}
          onRemove={() => removeItem(index)}
          onAdd={() => addItem(index)}
          onSub={() => subItem(index)}
        />
      ))}
    </div>
  );
};

export default Demo;

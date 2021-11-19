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
    const lineitem = cart.find(({ item }) => item === this_id);
    const isExist = lineitem == null ? false : true;
    const foundIndex = cart.findIndex(({ item }) => item === this_id);

    if (!isExist) {
      setCart([...cart, { item: item.id, quantity: 1 }]);
    } else {
      cart.splice(foundIndex, 1, {
        item: lineitem.item,
        quantity: lineitem.quantity + 1
      });
      setCart([...cart]);
    }
  }

  function addItem(index: number) {
    const lineitem = cart[index];
    cart.splice(index, 1, {
      item: lineitem.item,
      quantity: lineitem.quantity + 1
    });
    setCart([...cart]);
  }

  function subItem(index: number) {
    const lineitem = cart[index];
    if (lineitem.quantity - 1 >= 1) {
      cart.splice(index, 1, {
        item: lineitem.item,
        quantity: lineitem.quantity - 1
      });
      setCart([...cart]);
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
      <p>Student name: Li Man </p>
      <p>Studnet ID: s187212</p>
      <p> Items: </p>
      {shopItems.map((item) => (
        <ShopItem key={item.id} item={item} onAdd={() => addItemToCart(item)} />
      ))}
      <p> Cart items: </p>
      <p> Current Total: </p>{" "}
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

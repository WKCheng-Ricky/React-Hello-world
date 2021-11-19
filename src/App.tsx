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
}> = function ({ item: lineitem, onRemove }) {
  const { item, quantity } = lineitem;
  return (
    <div>
      <p>Item ID: {item}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={onRemove}>Remove item</button>
    </div>
  );
};

const Demo: React.FC = function () {
  const [cart, setCart] = useState<LineItem[]>([]);
  const shopItems = getAllItems();

  function addItemToCart(item: Item) {
    setCart([...cart, { item: item.id, quantity: 1 }]);
  }

  function removeItem(index: number) {
    cart.splice(index, 1);
    setCart([...cart]);
  }
  return (
    <div>
      <p> Items: </p>
      {shopItems.map((item) => (
        <ShopItem key={item.id} item={item} onAdd={() => addItemToCart(item)} />
      ))}
      <p> Cart items: </p>
      {cart.map((item, index) => (
        <CartItem
          key={item.item}
          item={item}
          onRemove={() => removeItem(index)}
        />
      ))}
    </div>
  );
};

export default Demo;

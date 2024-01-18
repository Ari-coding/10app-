import CartContext from "./cart-context";
import { useReducer } from "react";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  // console.log("STATE", state);
  // console.log("ACTION:", action);
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // console.log("updatedTotalAmount", updatedTotalAmount);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log(existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    // console.log(existingCartItem);

    let updateItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // console.log(updatedItem);
      updateItems = [...state.items];
      // console.log("updateditems", updateItems);
      updateItems[existingCartItemIndex] = updatedItem;
    } else {
      updateItems = state.items.concat(action.item); //concat returns a brand new array instead of editing the existing arrray
    }

    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    console.log("STATE", state);
    console.log("ACTION:", action);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(existingCartItemIndex);
    const existingItem = state.items[existingCartItemIndex];
    console.log("existingItem", existingItem);
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      console.log("stateId", state.items.id);
      console.log("statactionIdeId", action.id);
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log("updatedItems:", updatedItems);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      console.log("updatedItem", updatedItem);
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      console.log("updateItems:", updatedItems);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  // console.log(cartState);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

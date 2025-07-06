"use client";

import type { CartItem, Product } from '@/lib/types';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity <= existingItem.stock) {
          updatedItems[existingItemIndex] = { ...existingItem, quantity: newQuantity };
        }
        return { ...state, items: updatedItems };
      } else {
        if (1 <= action.payload.stock) {
          const newItem: CartItem = { ...action.payload, quantity: 1 };
          return { ...state, items: [...state.items, newItem] };
        }
      }
      return state; // Do nothing if stock is 0
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

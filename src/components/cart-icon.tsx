'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/contexts/cart-provider';
import CartSheet from './cart-sheet';
import { useState, useEffect } from 'react';

export default function CartIcon() {
  const { state } = useCart();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = isClient ? state.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <CartSheet>
      <Button variant="ghost" size="icon" className="relative" aria-label="Open Cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Button>
    </CartSheet>
  );
}

'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-provider';
import Image from 'next/image';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import Link from 'next/link';
import QuantitySelector from './quantity-selector';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useCart();
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({state.items.reduce((s,i) => s + i.quantity, 0)})</SheetTitle>
        </SheetHeader>
        {state.items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6">
              {state.items.map(item => (
                <div key={item.id} className="flex items-start gap-4 py-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <QuantitySelector 
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.id, quantity: newQuantity }})}
                      max={item.stock}
                      className="mt-2"
                    />
                  </div>
                   <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.id } })}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/cart">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">Add items from a vendor to get started.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

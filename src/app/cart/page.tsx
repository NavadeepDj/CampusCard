'use client';

import QuantitySelector from '@/components/quantity-selector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleConfirmPurchase = () => {
    // In a real app, this would trigger a payment flow and update the backend.
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: 'Purchase Successful!',
      description: 'Your order has been placed. Check your history for the receipt.',
    });
    router.push('/history');
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
         <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.items.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      <QuantitySelector 
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.id, quantity: newQuantity }})}
                        max={item.stock}
                        className="mt-2"
                      />
                    </div>
                    <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="pt-2">
                <p className="font-semibold mb-2">Pay with</p>
                <div className="flex items-center p-3 border rounded-md bg-muted/50">
                    <CreditCard className="h-6 w-6 mr-3 text-muted-foreground"/>
                    <div className="flex-1">
                        <p className="font-medium text-sm">Visa ending in 1234</p>
                    </div>
                    <Button variant="link" size="sm" asChild><Link href="/account">Change</Link></Button>
                </div>
              </div>
              <Button size="lg" className="w-full mt-4" onClick={handleConfirmPurchase}>
                Confirm Purchase
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

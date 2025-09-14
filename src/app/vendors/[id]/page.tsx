
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-provider';
import { vendors } from '@/lib/data';
import { ArrowLeft, CheckCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function VendorPage() {
  const params = useParams<{ id: string }>();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const vendor = vendors.find(v => v.id === params.id);
  const { dispatch, state } = useCart();
  const { toast } = useToast();

  const cartItemsMap = useMemo(() => {
    return state.items.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {} as Record<string, typeof state.items[0]>);
  }, [state.items]);

  if (!vendor) {
    notFound();
  }

  const handleAddToCart = (product: typeof vendor.products[0]) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAddedProductId(product.id);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your cart.`,
    });
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vendors
          </Link>
        </Button>
        <div>
            <h1 className="text-4xl font-bold font-headline">{vendor.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{vendor.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vendor.products.map(product => {
          const cartItem = cartItemsMap[product.id];
          const stock = product.stock - (cartItem?.quantity || 0);
          const isOutOfStock = stock <= 0;
          const isJustAdded = addedProductId === product.id;

          return (
            <Card key={product.id} className={cn('glass-card flex flex-col overflow-hidden')}>
              <CardContent className="p-4 flex-1 flex flex-col">
                <CardTitle className="text-xl font-headline mb-1">{product.name}</CardTitle>
                <CardDescription>
                  <span className="text-base text-primary font-semibold">₹{product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground ml-2">({stock} available)</span>
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  disabled={isOutOfStock || isJustAdded} 
                  onClick={() => handleAddToCart(product)}
                  variant={isJustAdded ? "secondary" : "default"}
                >
                  {isJustAdded ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4"/> Added
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add to Cart
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

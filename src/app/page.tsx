
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { vendors } from '@/lib/data';
import { Camera, Store, Utensils } from 'lucide-react';
import Link from 'next/link';
import CameraScan from '@/components/camera-scan';
import { useCart } from '@/contexts/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleScanSuccess = (scanResult: string) => {
    // In a real app, you would likely validate the scanResult with a backend
    // and associate the payment with the student ID.
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: 'Payment Successful!',
      description: `Payment authorized for Student ID: ${scanResult}.`,
    });
    setIsDialogOpen(false);
    router.push('/history');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <div className="mx-auto max-w-2xl">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
            <Utensils className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Welcome to Campus Cart
          </h1>
          <p className="mt-4 text-lg text-foreground/90">
            Your one-stop solution for seamless payments at any vendor across campus. Tap, pay, and go!
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-8 bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
              <Camera className="mr-3 h-6 w-6" />
              Scan Student ID to Pay
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Scan ID</DialogTitle>
              <DialogDescription>
                Position your student ID card in front of the camera.
              </DialogDescription>
            </DialogHeader>
            <CameraScan onScanSuccess={handleScanSuccess} />
          </DialogContent>
        </Dialog>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-center mb-10">
           <Store className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-3xl font-bold font-headline text-center">Browse Vendors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <Link href={`/vendors/${vendor.id}`} key={vendor.id} className="group">
              <Card className={cn('glass-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2')}>
                <CardContent className="p-6 flex-1 flex flex-col">
                    <CardTitle className="font-headline text-2xl mb-2">{vendor.name}</CardTitle>
                    <CardDescription className="text-base">{vendor.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

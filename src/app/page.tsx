import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { vendors } from '@/lib/data';
import { Camera, QrCode, Store, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
          <p className="mt-4 text-lg text-muted-foreground">
            Your one-stop solution for seamless payments at any vendor across campus. Tap, pay, and go!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
              <Camera className="mr-3 h-6 w-6" />
              Scan Student ID to Pay
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Scan ID</DialogTitle>
              <DialogDescription>
                Position your student ID card in front of the camera.
              </DialogDescription>
            </DialogHeader>
            <div className="py-8 flex flex-col items-center justify-center gap-4">
              <QrCode className="h-32 w-32 text-muted-foreground animate-pulse" />
              <p className="text-sm text-muted-foreground">Searching for QR code...</p>
            </div>
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
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                      data-ai-hint={vendor.dataAiHint}
                    />
                  </div>
                </CardHeader>
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

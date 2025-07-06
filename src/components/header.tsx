import { ShoppingBag, User, History, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import CartIcon from './cart-icon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">Campus Cart</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/history" aria-label="Transaction History">
                <History className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account" aria-label="My Account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}

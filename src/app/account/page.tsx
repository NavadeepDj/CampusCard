import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { user } from '@/lib/data';
import { CreditCard, History, LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center mb-8">
        <UserIcon className="w-8 h-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold font-headline">My Account</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.dataAiHint} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center">
              <CreditCard className="w-5 h-5 mr-3 text-primary" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your saved payment methods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
             <Button variant="secondary" className="mt-4 w-full">Add New Payment Method</Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center">
                    <History className="w-5 h-5 mr-3 text-primary"/>
                    Order History
                </CardTitle>
                <CardDescription>View your past transactions and receipts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/history">View Transaction History</Link>
                </Button>
            </CardContent>
        </Card>

        <Separator />
        
        <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
        </Button>
      </div>

    </div>
  );
}

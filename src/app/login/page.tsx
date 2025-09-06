
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signInWithGoogle } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.58 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.3.62 4.54 1.8l2.5-2.5C18.04 3.24 15.48 2 12.48 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.52 0 10-4.48 10-10 0-1.28-.15-2.54-.4-3.72h-9.6z" />
  </svg>
);

export default function LoginPage() {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
        // This will start the redirect flow. The user will be sent away and then
        // back to the app. The AuthProvider will handle the redirect result.
        await signInWithGoogle();
    } catch (error) {
        console.error("Sign-in failed", error);
        toast({
            variant: 'destructive',
            title: 'Sign In Failed',
            description: 'Could not initiate sign-in with Google. Please try again.',
        });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <Tabs defaultValue="signin" className="w-full">
          <CardHeader className="text-center pb-4">
             <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
            <CardDescription>Select a method to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button variant="outline" className="w-full text-base py-6" onClick={handleGoogleSignIn}>
              <GoogleIcon className="mr-3 h-5 w-5" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
             <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="signin" className="text-base">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4 m-0">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password-signin">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password-signin" type="password" required />
              </div>
              <Button type="submit" className="w-full text-base py-6">
                Sign In
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4 m-0">
              <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                <Input id="name-signup" placeholder="Alex Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
              <Button type="submit" className="w-full text-base py-6">
                Create Account
              </Button>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

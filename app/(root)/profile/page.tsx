import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { BookmarkCheck, MessageSquareDiff } from 'lucide-react';

const UserProfilePage = () => {
  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <Card className="w-full">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <Image
              className="rounded-full"
              src="https://placehold.co/600x600/png"
              alt="profile"
              width={100}
              height={100}
            />
            <div>
              <CardTitle className="text-3xl font-bold">FYQ</CardTitle>
              <CardDescription className="text-muted-foreground">
                test@email.com
              </CardDescription>
            </div>
          </div>
          <blockquote className="border-primary text-muted-foreground hidden border-l-4 pl-2 italic lg:block">
            <p>
              “Games are not just toys. They can be a bridge to something more.”
            </p>
            <footer className="mt-2 text-sm font-semibold">
              Hideo Kojima (creator of Metal Gear Solid)
            </footer>
          </blockquote>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <BookmarkCheck className="text-primary hidden h-6 w-6 sm:block" />
              <div>
                <p className="text-center text-lg font-bold">6</p>
                <p className="text-muted-foreground text-sm">Saved</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquareDiff className="text-primary hidden h-6 w-6 sm:block" />
              <div>
                <p className="text-center text-lg font-bold">6</p>
                <p className="text-muted-foreground text-sm">Rated</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;

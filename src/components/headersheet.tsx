import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className=" py-2 px-4 justify-center items-center gap-2 rounded-full"
          variant="outline"
        >
          <Image src="shop.svg" alt="" width={26} height={26} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[635px] h-screen justify-between p-8 flex flex-col items-start gap-6 rounded-tl-[20px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[20px]">
        <SheetHeader>
          <SheetTitle>Order detail</SheetTitle>
          <Tabs defaultValue="account" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">My Card</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>My Card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <div className="flex rounded-2xl  border  gap-5 flex-col  p-4 ">
              <h1 className="text-[20px] font-normal leading-7 font-inter">
                Payment info
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-[#71717A]">items</p>
                <p>$25</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#71717A]">shopping</p>
                <p>$25</p>
              </div>
              <div className="w-[250px] h-[1px] bg-black"></div>
              <div className="flex justify-between items-center">
                <p className="text-[#71717A]">total</p>
                <p>$25</p>
              </div>
              <div>
                <CardFooter className="flex flex-col justify-center items-center">
                  <Button className="w-[239px] h-[44px] flex py-2 px-8 justify-center items-center gap-2 rounded-full bg-[#EF4444]">
                    Check Out
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

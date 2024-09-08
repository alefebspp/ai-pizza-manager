"use client";
import { PropsWithChildren, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import NavBarContent from "./Content";

export default function NavBarSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="ml-4 mt-4 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="lg:hidden">
        <NavBarContent onNavigate={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

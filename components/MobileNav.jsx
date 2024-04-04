import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";

const MobileNav = () => {
  return (
    <div className="bg-neutral-900 py-3 fixed w-full flex lg:hidden z-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu className="text-white h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-neutral-900 border-none"
        >
          <Navbar show={true} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

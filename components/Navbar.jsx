import { Search, Menu, EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import RoutesItem from "./RoutesItem";

const Navbar = ({ show }) => {
  return (
    <nav
      className={`bg-neutral-900 p-2 lg:p-4 pb-1 rounded-r-lg gap-12 h-full text-white ${
        show ? "flex flex-col" : "hidden lg:flex lg:flex-col" 
      }`}
    >
      <div className="flex justify-between items-center cursor-pointer">
        <h1 className="text-3xl font-bold text-color">Carbon Cell</h1>
        <Menu className="hidden lg:flex" />
      </div>
      <div className="bg-neutral-700 rounded-md flex p-2 gap-2">
        <Search />
        <input
          type="text"
          placeholder="search"
          name=""
          id=""
          className="w-full bg-neutral-700 rounded-lg text-white focus:outline-none"
        />
      </div>
      <RoutesItem show={show} />
      <div className="flex w-full justify-between items-center cursor-pointer mt-auto pb-5">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="/images/avatarFallbackImg.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-md font-bold leading-5">
            Brooklyn Simmons <br />
            <span className="text-xs font-medium">
              brooklynsimmons@gmail.com
            </span>
          </p>
        </div>
        <EllipsisVertical />
      </div>
    </nav>
  );
};

export default Navbar;

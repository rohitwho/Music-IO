
import {Popover, PopoverTrigger, PopoverContent,  User,Input} from "@nextui-org/react";
import {UserTwitterCard} from "./UserTwitterCard";

export default function PopOver() {
  return (
<Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User   
          as="button"

         
          className="transition-transform"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard />
      </PopoverContent>
    </Popover>
  );
}

import Image from "next/image";
import { useState } from "react";
import { SearchBarContainer } from "../globalstyled";

export default function Searchbar() {
  const [searchName, setSearchName] = useState("");
  const searchHandler = () => {
    return;
  };
  return (
    <div className="w-full bg-[#eaeaea] flex items-center justify-evenly h-16 px-4 rounded-b-3xl">
      <input className="w-[95%] rounded-sm h-7 pl-2 outline-none" type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
      <button onClick={searchHandler}>
        <Image src="/magnifier.svg" alt="search-logo" width="20" height="20" />
      </button>
    </div>
  );
}

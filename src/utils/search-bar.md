import React from "react";
import { NameData, name } from "./names-data";
import { useState } from "react";

// create the functional component: searchBar
const SearchBar: React.FC = () => {
const [text, setText] = useState<string>("");
const [nameList, setnameList] = useState<NameData[] | undefined>(name);

const handleOnClick = () => {
const findName =
nameList && nameList?.length > 0
? nameList?.filter((u) => u?.name.toLowerCase().includes(text.toLowerCase()) === true)
: undefined;
setnameList(findName);
};

return (
<>

<h1>Search here!</h1>
<div>
<input
type="text"
placeholder="Search"
value={text}
onChange={(e) => {
setText(e.target.value);
setnameList(name);
}}
/>
<button disabled={!text} onClick={handleOnClick}>
Search
</button>
</div>
<div>
{nameList && nameList?.length === 0 && <div>No user found</div>}
{nameList &&
nameList?.length > 0 &&
nameList?.map((user) => {
return (
<p key={user?.id}>
<h3>Name: {user?.name}</h3>
<p>Age: {user?.sex}</p>
</p>
);
})}
</div>
</>
);
};

export default SearchBar;

import { name, NameData } from "./names-data";
import { useState } from "react"

// sorting the baby-names alphabetically
name.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

// making all the buttons for each name
export default function NameRender(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [nameList, setnameList] = useState<NameData[] | undefined>(name);
  
  const handleOnClick = () => {
    const findName =
      nameList && nameList?.length > 0
        ? nameList?.filter((u) => u?.name.toLowerCase().includes(text.toLowerCase()) === true)
        : undefined;
    setnameList(findName);
  };

  interface NameMapItemProps {
    name: NameData;
  }

  // colouring the buttons depending on "f" and "m"
  const NameMapItem = (props: NameMapItemProps) => {
    return (
      <>
        {props.name.sex === "f"}
        <button className="f">{props.name.name}</button>

        {props.name.sex === "m"}
        <button className="m">{props.name.name}</button>
      </>
    );
  };

  // mapping over the whole list of names
  const NameList = () => {
    return (
      <>
        <div>
          <input
            type="text"
            placeholder="Search here"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setnameList(name);
            }}
          />
          <button className="search" disabled={!text} onClick={handleOnClick}>
            Search
          </button>
        </div>
        <p> </p>
        <div>
          {nameList && nameList?.length === 0 && <div>No user found</div>}
          {nameList &&
            nameList?.length > 0 &&
            nameList?.map((name) => {
              return (
                <NameMapItem name={name} key={name.id} />
              );
            })}
        </div>
      </>
    );
  };

  return (
    <>
      <NameList />
    </>
  );
}

import { name, NameData } from "./names-data";
import { useState } from "react";

// making all the buttons for each name ++ search-bar
export default function SearchNameRender(): JSX.Element {
  const [text, setText] = useState<string>("");

  // (1) sorting through the names, alphabetically.
  // (2) filter through the names, based on the input "text"
  //     in the search bar.
  // (3) mapping over all the names to make individual buttons
  //     with the colour based on sex, className={babyNameData.sex}
  const NameRender = name
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((babyNameData: NameData) =>
      babyNameData.name.toLowerCase().includes(text.toLowerCase())
    )
    .map((babyNameData: NameData) => {
      return (
        <>
          <button key={babyNameData.id} className={babyNameData.sex}>
            {babyNameData.name}
          </button>
        </>
      );
    });

  // final return
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <p></p>
      <div>{NameRender}</div>
    </>
  );
}

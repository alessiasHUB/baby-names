import { babyName, NameData } from "../utils/babyName";
import { useState } from "react";

// making all the buttons for each name ++ search-bar
export default function SearchNameRender(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [fave, setFave] = useState<number[]>([]);

  // adding a name to favourites
  const handleFaveNames = (faveID: number) => {
    setFave([faveID, ...fave]);
  };

  // removing a name from favourites
  const handleRemoval = (faveID: number) => {
    const cleanIDs = fave.filter((ID) => ID !== faveID);
    setFave([...cleanIDs]);
  };

  // (1) sorting through the names, alphabetically.
  // (2) filter through the names, based on the input "text"
  //     in the search bar.
  // (3) mapping over all the names to make individual buttons
  //     with the colour based on sex, className={babyNameData.sex}
  const nameRender = babyName
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter(
      (babyNameData: NameData) =>
        babyNameData.name.toLowerCase().includes(text.toLowerCase()) &&
        !fave.includes(babyNameData.id)
    )
    .map((babyNameData: NameData) => {
      return (
        <button
          onClick={() => handleFaveNames(babyNameData.id)}
          key={babyNameData.id}
          className={babyNameData.sex}
        >
          {babyNameData.name}
        </button>
      );
    });

  // render the favourite name element
  const faveNameRender = babyName
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((favourite: NameData) => fave.includes(favourite.id))
    .map((favourite: NameData) => {
      return (
        <button
          onClick={() => handleRemoval(favourite.id)}
          key={favourite.id}
          className={favourite.sex}
        >
          {favourite.name}
        </button>
      );
    });

  // final return
  return (
    <>
      <div>
        <div>
          <h3>Favourite names:</h3>
          <p>{faveNameRender}</p>
        </div>
        <input
          type="text"
          placeholder="Search here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div>{nameRender}</div>
    </>
  );
}

import { babyName, NameData } from "../utils/babyName";
import { useState } from "react";

// making all the buttons for each name ++ search-bar
export default function SearchNameRender(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [fave, setFave] = useState<number[]>([]);
  const [sex, setsex] = useState<boolean | undefined>(undefined);
  // girl = true, boy = false, all = undefined

  // adding a name to favourites
  const handleFaveNames = (faveID: number) => {
    setFave([faveID, ...fave]);
  };

  // removing a name from favourites
  const handleRemoval = (faveID: number) => {
    const cleanIDs = fave.filter((ID) => ID !== faveID);
    setFave([...cleanIDs]);
  };

  const handleBoys = () => {
    if (sex === undefined || sex === true) {
      setsex(false);
    } else {
      setsex(undefined);
    }
  };
  const handleGirls = () => {
    if (sex === undefined || sex === false) {
      setsex(true);
    } else {
      setsex(undefined);
    }
  };
  // const handleResetsex = () => {
  //   setsex(undefined)
  // };
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
    .filter((favourite: NameData) =>
      sex === true
        ? favourite.sex === "f"
        : sex === false
        ? favourite.sex === "m"
        : favourite.sex
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
    .filter((favourite: NameData) =>
      sex === true
        ? favourite.sex === "f"
        : sex === false
        ? favourite.sex === "m"
        : favourite.sex
    )
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
          {faveNameRender.length > 0 && (
            <>
              <h3 className="fav-names">Favourite names:</h3>
              <p>{faveNameRender}</p>
            </>
          )}
        </div>
        <hr />
        <input
          type="text"
          placeholder="Search here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="m" onClick={handleBoys}>
          ♂
        </button>
        <button className="f" onClick={handleGirls}>
          ♀
        </button>
        {/* <button onClick={handleResetsex}>♀ & ♂</button> */}
        <hr />
      </div>
      <div>{nameRender}</div>
    </>
  );
}

import {name} from "./names-data"

export interface Name {
  id: number;
  name: string;
  sex: string;
}

export default function NameRender(): JSX.Element {
  interface NameMapItemProps {
    name: Name;
  }
    
  const NameMapItem = (props:NameMapItemProps) => {
    return (
      <p>{props.name.name}</p>
    );
  };

  const NameList = () => {
    return (
      <button>
        {name.map((name) => {
          return <NameMapItem name={name} key={name.id} />;
        })}
      </button>
    );
  };
}

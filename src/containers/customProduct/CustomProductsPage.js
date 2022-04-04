import "./styles.css";
import Example from "./CustomProductContainer";
import Example2 from "./CustomPianoContainer";
import ViolinContainer from "./ViolinContainer";
import Exemple3 from "./CustomElectrique";
import Exemple4 from "./CustomDrums";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { useState } from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
const CustomProductsPage = () => {
  const FILTERS = [
    { name: "Guitar" },
    { name: "Piano" },
    { name: "Guitar Electrique" },
    { name: "Violin" },
    { name: "Drums" },
  ];
  const [selected, set] = useState(1)
  const filter = (e) => {
    set(e)
    console.log(e)
  }
  return (
    <div className="">
      <Dropdown
            className="flex justify-center ml-5 mt-5"
            color="indigo"
            placement="bottom-start"
            buttonText="Instrument"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >
            <DropdownItem 
            color="indigo" ripple="light"
            onClick={() => set(1)}
            >
                Guitar
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(2)}>
                Guitar Electrique
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(3)}>
                Piano
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(4)}>
                Drums
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(5)}>
                Violine
            </DropdownItem>
            
        </Dropdown>
      {selected===1 ? <Example></Example> : ""} 
      {selected===2 ?<Exemple3></Exemple3> : ""}
      {selected===3 ?<Example2></Example2> : ""}
      {selected===4 ?<Exemple4></Exemple4> : ""}
      {selected===5 ?<ViolinContainer></ViolinContainer> : ""}
    </div>
  );
};
export default CustomProductsPage;

import { useState } from "react";


function SampleGridElement(props) {

    // This component is a dumbed down copy of the GridElement component
    // It is to be used on the How to Play page in order to help teach
    // nonograms to people who might not know much about them

    let [colorToggle, setColorToggle] = useState("colorWhite");

    function changeColor(e) {
        // console.log('clicked grid space position of:', position);
        let val;
    
        if (e.button === 0) {
          if (colorToggle === "colorWhite") {
            setColorToggle("colorBlack");
          } else if (colorToggle === "colorBlack") {
            setColorToggle("colorRed");
          } else {
            setColorToggle("colorWhite");
          }
        } else {
          e.preventDefault();
          if (colorToggle === "colorWhite") {
            setColorToggle("colorRed");
          } else if (colorToggle === "colorBlack") {
            setColorToggle("colorRed");
          } else {
            setColorToggle("colorWhite");
          }
        }
      }


    return (
        <>
            <td className={colorToggle}
                onClick={event => changeColor(event)}
                onContextMenu={(event) => changeColor(event)}>
            </td>
        </>
    )
}

export default SampleGridElement;
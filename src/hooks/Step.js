import { useState } from "react";

const useInput = () => {
  //input


  const [steps, setSteps] = useState([{ step: "", completed: false }]);


  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...steps];
    list[index].step = value;

    list[index].completed = false;


    setSteps(list);
  };

  const handleRemove = (index) => {
    const list = [...steps];
    list.splice(index, 1);
    setSteps(list);
  };

  const addInput = () => {

   

    setSteps([...steps, { step: "", completed: false }]);
    console.log(steps);

  };

  return [steps, handleChange, addInput, handleRemove];
};

export default useInput;

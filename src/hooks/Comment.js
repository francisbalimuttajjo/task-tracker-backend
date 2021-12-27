import { useState } from "react";

const useComment = () => {
  //input
  const [comments, setComments] = useState([{ comment: "" }]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...comments];
    list[index].comment = value;

    setComments(list);
  };

  const handleRemove = (index) => {
    const list = [...comments];
    list.splice(index, 1);
    setComments(list);
  };

  const addInput = () => {
    setComments([...comments, { comment: "" }]);
  };

  return [comments, handleChange, addInput, handleRemove];
};

export default useComment;

import { TextField } from "@mui/material";

const TextFieldInput = ({ label, ...props }) => {
  return (
    <>
      <TextField
        size="small"
        sx={{ width: "100%", margin: "10px" }}
        name={props.name}
        id={props.name}
        label={props.name}
        value={props.value}
        error={props.error}
        onChange={props.onChange}
        variant="standard"
        type={!props.type ? "text" : props.type}
        placeholder={`enter ${props.name}`}
        helperText={props.helperText}
      />
    </>
  );
};
export default TextFieldInput;

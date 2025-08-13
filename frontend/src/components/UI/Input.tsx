import { TextField, TextFieldProps, styled } from '@mui/material';

const StyledInputField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#8C8E8E',
  },
  '& .MuiInputLabel-asterisk': {
    color: 'red',
  },
});

type CustomTextFieldProps = TextFieldProps;

export default function Input(props: CustomTextFieldProps) {
  return (
    <StyledInputField
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

export default function Button({ children, isLoading = false, ...props }: ButtonProps) {
  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      fullWidth
      disabled={isLoading || props.disabled}
      sx={{
        py: '0.65rem',
        textTransform: 'none',
        fontSize: '0.875rem',
      }}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}
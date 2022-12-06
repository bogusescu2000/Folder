import { Button } from "@mui/material";
import "../index.css";

type ButtonProps = {
  name: string;
  backColor?: string;
  textColor?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const FolderButton = ({
  name,
  onClick,
  backColor,
  textColor,
  disabled,
}: ButtonProps) => {
  return (
    <div>
      <Button
        style={{ backgroundColor: backColor, color: textColor }}
        id="blue-button"
        onClick={onClick}
        variant="contained"
        disabled={disabled}
      >
        {name}
      </Button>
    </div>
  );
};

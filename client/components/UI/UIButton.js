import { Button, IconButton } from "mui";
import { LoadingButton } from "mui/lab";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
const UIButton = ({
  children,
  onClick,
  variant,
  sx,
  loading,
  outlined,
  text,
  color,
  type,
  startIcon,
  endIcon,
  as,
  href,
  ...otherProps
}) => {
  const router = useRouter();

  if (variant === "icon") {
    return (
      <IconButton
        color={color ? color : "inherit"}
        edge="start"
        onClick={onClick}
        sx={{
          ...sx,
        }}
        {...otherProps}
      >
        {children}
      </IconButton>
    );
  }

  if (variant === "loading") {
    return (
      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant={outlined ? "outlined" : "contained"}
        color={color ? color : "inherit"}
        loadingIndicator={
          <PulseLoader role={"progressbar"} size={10} color="white" />
        }
        sx={{
          mt: 3,
          mb: 2,
          p: 1.5,
          ":disabled": {
            backgroundColor: "primary.main",
            opacity: 0.5,
            cursor: "not-allowed",
          },
          ...sx,
        }}
        disabled={loading}
      >
        {children}
      </LoadingButton>
    );
  }

  const navigateLink = () => {
    if (as === "link" && href) {
      router.push(href);
    }
  };

  return (
    <Button
      type="button"
      color={color ? color : "inherit"}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={outlined ? "outlined" : text ? "text" : "contained"}
      onClick={onClick ? onClick : navigateLink}
      sx={{
        textTransform: "none",
        display: "flex",
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default UIButton;

import {Backdrop, CircularProgress} from "@mui/material";

const Loading = ({ load }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={load}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading

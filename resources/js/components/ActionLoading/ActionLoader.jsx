import { Backdrop, CircularProgress } from "@mui/material";

const ActionLoader = ({ processing, type }) => {
  return (
    <Backdrop open={processing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color={type} />
    </Backdrop>
  )
}

export default ActionLoader

import { Alert, Button, TextField, Typography } from "@mui/material";
import AudioFileOutlinedIcon from "@mui/icons-material/AudioFileOutlined";
const TailwindSam = () => {
  return (
    <>
      <Alert severity="success" className="mb-4">
        This is a Tailwind Sam component styled with Tailwind CSS.{" "}
      </Alert>
      <Typography variant="subtitle1" className="text-4xl font-bold mb-4">
        <AudioFileOutlinedIcon className="mr-2" />
        Tailwind Sam
      </Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        className="mb-4 border-solid border-gray-300"
      />
      <Button variant="contained">Hi I am new</Button>
    </>
  );
};

export default TailwindSam;

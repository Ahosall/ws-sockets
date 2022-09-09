import { CircularProgress, Box, Modal, Typography } from "@mui/material";

type TTexts = {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption";
  value: string;
  sx?: any;
};

interface IAnnoucement {
  status: boolean;
  texts: Array<TTexts>;
  circular: boolean;
}

const Annoucements = ({ status, texts, circular }: IAnnoucement) => {
  return (
    <Modal
      open={status}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          py: 3,
          px: 6,
          outline: "none",
          textAlign: "center",
        }}
      >
        {circular ? <CircularProgress color="secondary" /> : null}

        {texts.map((txt, i) => (
          <Typography key={i} variant={txt.variant}>
            {txt.value}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default Annoucements;

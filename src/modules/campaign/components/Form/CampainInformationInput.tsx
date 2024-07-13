import { Box, TextField } from "@mui/material";

export function CampaignInformationInput() {
  return (
    <Box display="flex" flexDirection={"column"} gap={"16px"}>
      <TextField
        id="campaign-name"
        label="Tên chiến dịch"
        variant="standard"
        required
        name="campaign-name"
        fullWidth
      />
      <TextField
        id="campaign-description"
        label="Mô tả"
        name="campaign-description"
        variant="standard"
        fullWidth
      />
    </Box>
  );
}

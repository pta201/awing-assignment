import { CheckBox } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

export function SubCampaignInput() {
  return (
    <Box display="flex" flexDirection={"column"}>
      <Box>
        <TextField
          id="sub-campaign-name"
          label="Tên chiến dịch con"
          variant="standard"
          required
        />
        <CheckBox /> Đang hoạt động
      </Box>
      <TextField
        id="campaign-name"
        label="Tên chiến dịch"
        variant="standard"
        required
      />
      <TextField id="campaign-description" label="Mô tả" variant="standard" />
    </Box>
  );
}

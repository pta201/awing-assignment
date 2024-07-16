import { isNameValid } from "@/modules/campaign/helper";
import { useCampaign } from "@/modules/campaign/hooks/useCampaign";
import { Box, TextField } from "@mui/material";

export function CampaignInformationPanel() {
  const { information, updateInformation } = useCampaign();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInformation({ ...information, name: e.target.value });
  };
  const handleDescribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInformation({ ...information, describe: e.target.value });
  };
  return (
    <Box display="flex" flexDirection={"column"} gap={"16px"}>
      <TextField
        id="campaign-name"
        label="Tên chiến dịch"
        variant="standard"
        required
        name="campaign-name"
        fullWidth
        value={information.name}
        onChange={handleNameChange}
        error={information.errors.length > 0 && !isNameValid(information.name)}
      />
      <TextField
        id="campaign-description"
        label="Mô tả"
        name="campaign-description"
        variant="standard"
        fullWidth
        value={information.describe}
        onChange={handleDescribeChange}
      />
    </Box>
  );
}

import { AdsInput } from "@/modules/campaign/components/Form/SubCampaign/AdsInput";
import { useCampaign } from "@/modules/campaign/hooks/useCampaign";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";

export function SubCampaignInput() {
  const { currentSubCampaign, updateSubCampaignStatus, updateSubCampaignName } =
    useCampaign();
  console.log(currentSubCampaign);

  const handleUpdateSubCampaignName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateSubCampaignName(e.target.value);
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          id="sub-campaign-name"
          label="Tên chiến dịch con"
          variant="standard"
          fullWidth
          required
          onChange={handleUpdateSubCampaignName}
          value={currentSubCampaign.name}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentSubCampaign.status}
              onChange={() => {
                updateSubCampaignStatus(currentSubCampaign.id);
              }}
            />
          }
          label="Đang hoạt động"
        />
      </Box>
      <AdsInput />
    </Box>
  );
}

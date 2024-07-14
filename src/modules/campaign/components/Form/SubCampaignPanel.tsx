import { SubCampaignList } from "@/modules/campaign/components/Form/SubCampaign/List";
import { SubCampaignInput } from "@/modules/campaign/components/Form/SubCampaign/SubCampaignInput";
import { Box } from "@mui/material";
export function SubCampaignPanel() {
  return (
    <Box display="flex" flexDirection={"column"}>
      <SubCampaignList />
      <SubCampaignInput />
    </Box>
  );
}

import { SubCampaignCard } from "@/modules/campaign/components/Form/SubCampaign/Card";
import { useCampaign } from "@/modules/campaign/hooks/useCampaign";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";

export function SubCampaignList() {
  const { subCampaigns, addSubCampaign, setActiveSubCampaignId } =
    useCampaign();
  return (
    <Box
      display={"flex"}
      flexDirection="row"
      overflow="auto"
      gap="16px"
      padding="8px"
    >
      <Box>
        <Fab aria-label="add" size="small" onClick={addSubCampaign}>
          <AddIcon />
        </Fab>
      </Box>
      {subCampaigns.map((item) => {
        return (
          <SubCampaignCard
            subCampaign={item}
            key={item.id}
            onClick={() => setActiveSubCampaignId(item.id)}
          />
        );
      })}
    </Box>
  );
}

import { TabPanel } from "@/components/TabPanel";
import { CampaignInformationInput } from "@/modules/campaign/components/Form/CampainInformationInput";
import { SubCampaignInput } from "@/modules/campaign/components/Form/SubCampaignInput";
import { Box, Button, Container, Divider, Paper, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";

export function CampaignForm() {
  const [activeTab, setActiveTab] = React.useState("information");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const handleFormSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const value = e;
    console.log(value);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Box display="flex" justifyContent="flex-end" p={"10px 20px"}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      <Divider color="black" />
      <Container maxWidth={false} sx={{ padding: "24px" }}>
        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={handleChange}>
              <Tab value="information" label="Thông tin" />
              <Tab value="subCampaigns" label="Chiến dịch con" />
            </Tabs>
          </Box>

          <TabPanel value="information" currentActiveTab={activeTab}>
            <CampaignInformationInput />
          </TabPanel>
          <TabPanel value="subCampaigns" currentActiveTab={activeTab}>
            <SubCampaignInput />
          </TabPanel>
        </Paper>
      </Container>
    </form>
  );
}

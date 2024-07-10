import React from "react";
import Tab from "@mui/material/Tab";
import { Box, Container, Paper, Tabs } from "@mui/material";
import { TabPanel } from "@/components/TabPanel";

export function CampaignForm() {
  const [value, setValue] = React.useState("information");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="information" label="Thông tin" />
        <Tab value="subCampaigns" label="Chiến dịch con" />
      </Tabs>
      <TabPanel value="information" currentActiveTab={value}>
        HELOO
      </TabPanel>
      <TabPanel value="subCampaigns" currentActiveTab={value}>
        Hi
      </TabPanel>
    </Paper>
  );
}

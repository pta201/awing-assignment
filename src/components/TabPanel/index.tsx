import { Box } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  currentActiveTab: number | string;
  value: number | string;
}

export function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, currentActiveTab, ...other } = props;

  return (
    <Box
      sx={{ p: "16px" }}
      role="tabpanel"
      hidden={value !== currentActiveTab}
      {...other}
    >
      {value === currentActiveTab && children}
    </Box>
  );
}

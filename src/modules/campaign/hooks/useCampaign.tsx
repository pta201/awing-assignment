import { Campaign, SubCampaign } from "@/types";
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

interface CampaignFormContext {
  handleFormSubmit: (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => void;
  data: Campaign;
}

const CampaignFormContext = createContext(null);

export const CampaignProvider = ({ children }: PropsWithChildren) => {
  const [information, setInfomation] = React.useState<Campaign["information"]>({
    name: "",
    describe: "",
  });
  const [subCampaigns, setSubCampaigns] = useState<Campaign["subCampaigns"]>(
    []
  );
  const handleUpdateInformation = ({
    name,
    describe,
  }: Campaign["information"]) => {
    setInfomation({ name, describe });
  };

  const handleUpdateSubCampaigns = (subCampaigns: SubCampaign[]) => {
    setSubCampaigns(subCampaigns);
  };
  const value = useMemo(
    () => ({
      information,
      updateInformation: handleUpdateInformation,
      updateSubCampaign: handleUpdateSubCampaigns,
    }),
    []
  );

  return (
    <CampaignFormContext.Provider value={value}>
      {children}
    </CampaignFormContext.Provider>
  );
};

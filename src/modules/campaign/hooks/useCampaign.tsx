import { Campaign, SubCampaign } from "@/types";
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

interface ICampaignFormContext {
  information: Campaign["information"];
  subCampaigns: Campaign["subCampaigns"];
  updateInformation: ({ name, describe }: Campaign["information"]) => void;
  updateSubCampaign: (subCampaigns: SubCampaign[]) => void;
}

const CampaignFormContext = createContext<ICampaignFormContext>(null!);

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
      subCampaigns,
      updateInformation: handleUpdateInformation,
      updateSubCampaign: handleUpdateSubCampaigns,
    }),
    [information, subCampaigns]
  );

  return (
    <CampaignFormContext.Provider value={value}>
      {children}
    </CampaignFormContext.Provider>
  );
};

export const useCampaign = () => {
  const context = React.useContext(CampaignFormContext);
  if (!context) {
    throw new Error("useCampaign must be used within CampaignProvider");
  }
  return context;
};

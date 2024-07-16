import {
  FormAd,
  FormCampaignInformation,
  FormSubCampaign,
} from "@/modules/campaign/hooks/useCampaign";

export const generateId = (prefix: string) => {
  return `${prefix}-${Date.now()}`;
};

export const isAdQuantityValid = (ad: FormAd) => {
  return ad.quantity > 0;
};

export const isNameValid = (name: string) => {
  return name.trim() !== "";
};

export const validateSubCampaign = (subCampaign: FormSubCampaign) => {
  const errors = [];
  if (!isNameValid(subCampaign.name)) {
    errors.push("subCampaignName");
  }

  if (subCampaign.ads.length === 0) {
    errors.push("subCampaignAds");
  }
  subCampaign.ads.forEach((ad) => {
    if (!isAdQuantityValid(ad)) {
      errors.push("adQuantity");
    }
    if (!isNameValid(ad.name)) {
      errors.push("adName");
    }
  });

  return errors;
};

export const validateCampaignInformation = (
  information: FormCampaignInformation
) => {
  if (information.name.trim() === "") {
    return ["campaignName"];
  }
  return [];
};

export const constructPayload = ({
  information,
  subCampaigns,
}: {
  information: FormCampaignInformation;
  subCampaigns: FormSubCampaign[];
}) => {
  return {
    information,
    subCampaigns: subCampaigns.map((subCampaign) => {
      return {
        name: subCampaign.name,
        status: subCampaign.status,
        ads: subCampaign.ads.map((ad) => {
          return {
            name: ad.name,
            quantity: ad.quantity,
          };
        }),
      };
    }),
  };
};

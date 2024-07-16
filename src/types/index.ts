export interface Campaign {
  information: CampaignInformation;
  subCampaigns: SubCampaign[];
}

export interface CampaignInformation {
  name: string;
  describe?: string;
}
export interface SubCampaign {
  name: string;
  status: boolean;
  ads: Ad[];
}

export interface Ad {
  name: string;
  quantity: number;
}

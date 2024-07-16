import {
  constructPayload,
  generateId,
  validateCampaignInformation,
  validateSubCampaign,
} from "@/modules/campaign/helper";
import { Ad, CampaignInformation, SubCampaign } from "@/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface FormAd extends Ad {
  id: string;
}
export interface FormSubCampaign extends SubCampaign {
  id: string;
  ads: FormAd[];
  errors: string[];
}
export interface FormCampaignInformation extends CampaignInformation {
  errors: string[];
}
export interface ICampaignFormContext {
  information: FormCampaignInformation;
  subCampaigns: FormSubCampaign[];
  currentSubCampaign: FormSubCampaign;
  activeSubCampaignId: string;
  setActiveSubCampaignId: (id: string) => void;
  updateInformation: ({ name, describe }: FormCampaignInformation) => void;
  updateSubCampaign: (subCampaigns: FormSubCampaign[]) => void;
  addSubCampaign: () => void;
  updateSubCampaignName: (newName: string) => void;
  updateSubCampaignStatus: () => void;
  removeSubCampaignAd: (id: string, subCampaignId: string) => void;
  addSubCampaignAd: () => void;
  updateAd: ({ id, value }: { id: string; value: Partial<FormAd> }) => void;
  deleteAd: ({ id }: { id: string }) => void;
  submit: () => void;
}

const CampaignFormContext = createContext<ICampaignFormContext>(null!);

export const CampaignProvider = ({ children }: PropsWithChildren) => {
  const [information, setInformation] = useState<FormCampaignInformation>({
    name: "",
    describe: "",
    errors: [],
  });
  const [subCampaigns, setSubCampaigns] = useState<FormSubCampaign[]>([
    {
      id: generateId("sub-campaign"),
      name: "Chiến dịch con 1",
      status: true,
      errors: [],
      ads: [
        {
          id: generateId("ad"),
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
    },
  ]);
  const [activeSubCampaignId, setActiveSubCampaignId] = useState(
    subCampaigns[0].id
  );
  const currentSubCampaign =
    subCampaigns.find((item) => item.id === activeSubCampaignId) ??
    subCampaigns[0];

  const handleUpdateInformation = ({
    name,
    describe,
  }: FormCampaignInformation) => {
    setInformation((prev) => ({ ...prev, name, describe }));
  };

  const handleUpdateSubCampaigns = (subCampaigns: FormSubCampaign[]) => {
    setSubCampaigns(subCampaigns);
  };
  const updateSubCampaignName = useCallback(
    (newName: string) => {
      if (!currentSubCampaign) return;
      const newSubCampaignInfo = { ...currentSubCampaign, name: newName };
      setSubCampaigns((prev) => {
        return prev.map((item) =>
          item.id === currentSubCampaign.id ? newSubCampaignInfo : item
        );
      });
    },
    [currentSubCampaign]
  );

  const addSubCampaign = useCallback(() => {
    const count = subCampaigns.length;

    const newSubCampaign: FormSubCampaign = {
      id: generateId("sub-campaign"),
      ads: [
        {
          id: generateId("ad"),
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
      name: `Chiến dịch con ${count + 1}`,
      status: true,
      errors: [],
    };
    setSubCampaigns((prev) => [...prev, newSubCampaign]);
  }, [subCampaigns.length]);

  const updateSubCampaignStatus = useCallback(() => {
    if (!currentSubCampaign) return;
    setSubCampaigns((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          status:
            item.id === currentSubCampaign.id ? !item.status : item.status,
        };
      });
    });
  }, [currentSubCampaign]);

  const addSubCampaignAd = useCallback(() => {
    if (!currentSubCampaign) return;

    const count = currentSubCampaign.ads.length;

    const newAd: FormAd = {
      id: generateId(`ad`),
      name: `Quảng cáo ${count + 1}`,
      quantity: 0,
    };

    setSubCampaigns((prev) => {
      return prev.map((subCampaign) => {
        if (subCampaign.id === currentSubCampaign.id) {
          return {
            ...subCampaign,
            ads: [...subCampaign.ads, newAd],
          };
        }
        return subCampaign;
      });
    });
  }, [currentSubCampaign]);

  const removeSubCampaignAd = useCallback(
    (id: string, subCampaignId: string) => {
      const subCampaign = subCampaigns.find(
        (item) => item.id === subCampaignId
      );
      if (!subCampaign) return;
      const newAds = subCampaign.ads.filter((ad) => ad.id !== id);

      setSubCampaigns((prev) => {
        return prev.map((subCampaign) => {
          if (subCampaign.id === subCampaignId) {
            return {
              ...subCampaign,
              ads: newAds,
            };
          }
          return subCampaign;
        });
      });
    },
    [subCampaigns]
  );

  const updateAd = useCallback(
    ({ id, value }: { id: string; value: Partial<FormAd> }) => {
      setSubCampaigns((prev) => {
        const newSubCampaigns = prev.map((subCampaign) => {
          const newAds = subCampaign.ads.map((ad) => {
            if (ad.id === id) {
              return {
                ...ad,
                ...value,
              };
            }
            return ad;
          });
          return {
            ...subCampaign,
            ads: newAds,
          };
        });
        return newSubCampaigns;
      });
    },
    []
  );
  const deleteAd = useCallback(
    ({ id }: { id: string }) => {
      const newAds = currentSubCampaign?.ads.filter((item) => item.id !== id);
      setSubCampaigns((prev) => {
        return prev.map((subCampaigns) => {
          if (subCampaigns.id === currentSubCampaign?.id) {
            return {
              ...subCampaigns,
              ads: newAds || [],
            };
          }
          return subCampaigns;
        });
      });
    },
    [currentSubCampaign?.ads, currentSubCampaign?.id]
  );

  const submit = useCallback(() => {
    let isError = false;
    setSubCampaigns((prev) =>
      prev.map((subCampaign) => {
        const newErrors = validateSubCampaign(subCampaign);
        console.log({ newErrors, subCampaign });

        if (newErrors.length > 0) {
          isError = true;
        }
        return {
          ...subCampaign,
          errors: newErrors,
        };
      })
    );

    const campaignInformationErrors = validateCampaignInformation(information);
    if (campaignInformationErrors.length > 0) {
      isError = true;
      setInformation((prev) => ({
        ...prev,
        errors: campaignInformationErrors,
      }));
    }
    if (isError) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
      return null;
    }

    alert(JSON.stringify(constructPayload({ information, subCampaigns })));
  }, [information, subCampaigns]);

  const value = useMemo(
    () => ({
      information,
      subCampaigns,
      activeSubCampaignId,
      currentSubCampaign,
      setActiveSubCampaignId,
      updateInformation: handleUpdateInformation,
      updateSubCampaign: handleUpdateSubCampaigns,
      addSubCampaign,
      updateSubCampaignName,
      updateSubCampaignStatus,
      removeSubCampaignAd,
      addSubCampaignAd,
      updateAd,
      deleteAd,
      submit,
    }),

    [
      activeSubCampaignId,
      addSubCampaign,
      addSubCampaignAd,
      currentSubCampaign,
      information,
      removeSubCampaignAd,
      subCampaigns,
      updateAd,
      updateSubCampaignName,
      updateSubCampaignStatus,
      deleteAd,
      submit,
    ]
  );

  return (
    <CampaignFormContext.Provider value={value}>
      {children}
    </CampaignFormContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignFormContext);
  if (!context) {
    throw new Error("useCampaign must be used within CampaignProvider");
  }
  return context;
};

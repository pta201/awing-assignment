import { FormSubCampaign } from "@/modules/campaign/hooks/useCampaign";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Tooltip,
  Typography,
} from "@mui/material";

export function SubCampaignCard({
  subCampaign,
  ...cardProps
}: Readonly<
  {
    subCampaign: FormSubCampaign;
  } & CardProps
>) {
  const totalQuantity = subCampaign.ads.reduce(
    (acc, ad) => acc + ad.quantity,
    0
  );
  return (
    <Card
      sx={{ minWidth: "210px", maxWidth: "210px", height: "120px" }}
      raised
      {...cardProps}
    >
      <CardHeader
        sx={{
          padding: "8px 8px 4px",
        }}
        title={
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              lineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "180px",
              textAlign: "center",
            }}
          >
            {subCampaign.name}
            <CheckCircleIcon
              sx={{ fontSize: "12px", verticalAlign: "middle" }}
              color={subCampaign.status ? "success" : "disabled"}
            />
          </Typography>
        }
      ></CardHeader>
      <CardContent sx={{ textAlign: "center", padding: "0 8px" }}>
        <Tooltip title="Số lượng" placement="left">
          <Typography variant="h5">{totalQuantity}</Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

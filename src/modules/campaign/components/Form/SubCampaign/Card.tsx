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
}: Readonly<{
  subCampaign: FormSubCampaign;
} & CardProps>) {
  return (
    <Card sx={{ minWidth: "210px", maxWidth: "210px", height: "120px" }} {...cardProps}>
      <CardHeader
        sx={{
          padding: "8px 8px 4px",
        }}
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {subCampaign.name}
            <CheckCircleIcon
              fontSize="inherit"
              color={subCampaign.status ? "success" : "disabled"}
            />
          </Box>
        }
        titleTypographyProps={{
          variant: "h6",
          noWrap: true,
          sx: {
            width: "200px",
          },
        }}
      ></CardHeader>
      <CardContent sx={{ textAlign: "center", padding: "0 8px" }}>
        <Tooltip title="Số lượng" placement="left">
          <Typography variant="h5">{0}</Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

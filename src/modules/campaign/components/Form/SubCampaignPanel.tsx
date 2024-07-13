import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export function SubCampaignPanel() {
  return (
    <Box display="flex" flexDirection={"column"}>
      <Box display={"flex"}>
        <Fab aria-label="add" size="small">
          <AddIcon />
        </Fab>
        <Card>
          <CardHeader
            sx={{
              padding: "8px 8px 4px",
            }}
            title="Chiến dịch con 1"
            titleTypographyProps={{ variant: "h5" }}
          ></CardHeader>
          <CardContent sx={{ textAlign: "center", padding: "0 8px" }}>
            <Tooltip title="Số lượng" placement="left">
              <Typography variant="h5">0</Typography>
            </Tooltip>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <TextField
          id="sub-campaign-name"
          label="Tên chiến dịch con"
          variant="standard"
          required
        />
        <CheckBox /> Đang hoạt động
      </Box>
      <TextField
        id="campaign-name"
        label="Tên chiến dịch"
        variant="standard"
        required
      />
      <TextField id="campaign-description" label="Mô tả" variant="standard" />
    </Box>
  );
}

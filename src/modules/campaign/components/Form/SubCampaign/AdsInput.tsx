import { FormAd, useCampaign } from "@/modules/campaign/hooks/useCampaign";
import {
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Checkbox,
  TextField,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import Delete from "@mui/icons-material/Delete";
import { isAdQuantityValid, isNameValid } from "@/modules/campaign/helper";

function EnhancedTableHead({
  selected,
  onSelectAllClick,
  rowCount,
}: Readonly<{
  selected: string[];
  onSelectAllClick: () => void;
  rowCount: number;
}>) {
  const { addSubCampaignAd, deleteAd } = useCampaign();
  const handleDeleteSelected = () => {
    selected.forEach((id) => deleteAd({ id }));
  };
  const numSelected = selected.length;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>

        <TableCell align="left" padding="none">
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={handleDeleteSelected}>
                <Delete />
              </IconButton>
            </Tooltip>
          ) : (
            "Tên quảng cáo*"
          )}
        </TableCell>
        <TableCell align="left" padding="none">
          {numSelected === 0 && "Số lượng*"}
        </TableCell>
        <TableCell align="right">
          <Button onClick={addSubCampaignAd}>Thêm</Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export function AdsInput() {
  const { currentSubCampaign, updateAd, deleteAd } = useCampaign();
  const [selected, setSelected] = React.useState<string[]>([]);
  const rows = currentSubCampaign.ads;

  const handleSelectAllClick = () => {
    setSelected((prev) => {
      const shouldCheckAll = rows.length !== prev.length;
      if (!shouldCheckAll) return [];
      return rows.map((item) => item.id);
    });
  };

  const isSelected = (id: string) => selected.includes(id);

  const handleCheck = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleUpdateAd = ({
    id,
    propName,
    value,
  }: {
    id: string;
    propName: keyof FormAd;
    value: string;
  }) => {
    updateAd({ id, value: { [propName]: value } });
  };

  const handleDeleteAds = (ids: string[]) => () => {
    ids.forEach((id) => deleteAd({ id }));
  };

  const isSubCampaignInvalid = currentSubCampaign.errors.length > 0;
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        title="Danh sách quảng cáo"
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <EnhancedTableHead
          selected={selected}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows.length}
        />
        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                    onClick={() => handleCheck(row.id)}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  <TextField
                    fullWidth
                    id="adsName"
                    error={isSubCampaignInvalid && !isNameValid(row.name)}
                    required
                    variant="standard"
                    value={row.name}
                    onChange={(e) =>
                      handleUpdateAd({
                        id: row.id,
                        propName: "name",
                        value: e.target.value || "",
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    id="adsQuantity"
                    type="number"
                    error={isSubCampaignInvalid && !isAdQuantityValid(row)}
                    required
                    variant="standard"
                    value={row.quantity}
                    onChange={(e) =>
                      handleUpdateAd({
                        id: row.id,
                        propName: "quantity",
                        value: e.target.value || "",
                      })
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Xoá" onClick={handleDeleteAds([row.id])}>
                    <Delete />
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

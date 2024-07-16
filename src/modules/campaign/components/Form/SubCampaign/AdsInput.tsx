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
} from "@mui/material";
import React from "react";
import Delete from "@mui/icons-material/Delete";
interface Props {}

function EnhancedTableHead({
  numSelected,
  onSelectAllClick,
  rowCount,
}: Readonly<{
  numSelected: number;
  onSelectAllClick: () => void;
  rowCount: number;
}>) {
  const { addSubCampaignAd } = useCampaign();

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
        <TableCell align="left">Tên</TableCell>
        <TableCell align="left">Số lượng</TableCell>
        <TableCell align="right">
          <Button onClick={addSubCampaignAd}>Thêm</Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export function AdsInput({}: Props) {
  const { currentSubCampaign, updateAd } = useCampaign();
  const [selected, setSelected] = React.useState<string[]>([]);
  const handleSelectAllClick = () => {
    setSelected([]);
  };
  const rows = currentSubCampaign.ads;
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

  const handleDeleteAds = (ids: string[]) => () => {};
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <EnhancedTableHead
          numSelected={selected.length}
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
                    error={!row.name}
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
                    error={!row.quantity}
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

// <TableContainer>
//   <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
//     <EnhancedTableHead
//       numSelected={selected.length}
//       onSelectAllClick={handleSelectAllClick}
//       rowCount={rows.length}
//     />
//     <TableBody>
//       {rows.map((row, index) => {
//         const isItemSelected = isSelected(row.id);
//         const labelId = `enhanced-table-checkbox-${index}`;

//         return (
//           <TableRow
//             hover
//             role="checkbox"
//             aria-checked={isItemSelected}
//             tabIndex={-1}
//             key={row.id}
//             selected={isItemSelected}
//             sx={{ cursor: "pointer" }}
//           >
//             <TableCell padding="checkbox">
//               <Checkbox
//                 color="primary"
//                 checked={isItemSelected}
//                 inputProps={{
//                   "aria-labelledby": labelId,
//                 }}
//                 onClick={(event) => handleClick(event, row.id)}
//               />
//             </TableCell>
//             <TableCell component="th" id={labelId} scope="row" padding="none">
//               <TextField
//                 sx={{
//                   width: "100%",
//                 }}
//                 id="adsName"
//                 error={!row.name}
//                 required
//                 variant="standard"
//                 value={row.name}
//                 onChange={(e) =>
//                   onChangeValuesAds(row.id, "name", e.target.value || "")
//                 }
//               />
//             </TableCell>
//             <TableCell align="right">
//               <TextField
//                 sx={{
//                   width: "100%",
//                 }}
//                 id="adsQuanlity"
//                 type="number"
//                 error={!row.quanlity}
//                 required
//                 variant="standard"
//                 value={row.quanlity}
//                 onChange={(e) =>
//                   onChangeValuesAds(row.id, "quantity", +e.target.value || "")
//                 }
//               />
//             </TableCell>
//             <TableCell align="right">
//               <Tooltip title="Xoá" onClick={onDeleteAdsCampaign([row.id])}>
//                 <DeleteIcon />
//               </Tooltip>
//             </TableCell>
//           </TableRow>
//         );
//       })}
//     </TableBody>
//   </Table>
// </TableContainer>;

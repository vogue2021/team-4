import React, { useState } from "react";
import { EventNote, NoiseAware } from "@mui/icons-material";
import {
  Button,
  Link,
  IconButton,
  Icon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import yesIcon from "../images/yes.png";
import noIcon from "../images/no.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ClearIcon from "@mui/icons-material/Clear";
import unknownIcon from "../images/unknown.png";
// import axios from "../utils/axios";
import "./DateProposalGrid.css";
import axios from "axios";

import { event } from "../types/Event";

interface MyObject {
  [key: string]: JSX.Element;
}
interface rowData {
  id: number;
  Schedule: string;
  yes: number;
  unknown: number;
  no: number;
}
export default function () {
  const [rows, setRows] = useState<rowData[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [schedule, setSchedule] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: number | null
  ) => {
    setSelected(newSelection);
  };
  const event = {
    eventName: "meeting",
    eventDetail: "123",
    respondents: 2,
  };

  React.useEffect(() => {
    axios
      .get(`/eventObject`)
      .then((response) => {
        console.log(response.data);
        setRows(generateRows(response.data));
        setColumns(generateColumns(response.data));
      })
      .catch((reason) => {
        console.log(reason);
        console.log("ERROR connecting backend service");
      });
  }, []);
  const generateRows = (eventObject: event) => {
    let rows: rowData[] = [];
    eventObject.scheduleList.map((schedule, index) => {
      let [yesNum, unknownNum, noNum] = [0, 0, 0];
      let nameList: MyObject = {};
      eventObject.participants.map((obj) => {
        if (obj.result[index] === 1) {
          yesNum += 1;
        } else if (obj.result[index] === 2) {
          unknownNum += 1;
        } else if (obj.result[index] === 3) {
          noNum += 1;
        }
      });
      rows.push({
        id: index + 1,
        Schedule: schedule,
        yes: yesNum,
        unknown: unknownNum,
        no: noNum,
      });
    });
    return rows;
  };
  const generateColumns = (eventObject: event) => {
    let columns: GridColDef[] = [
      {
        field: "Schedule",
        width: 100,
        headerAlign: "center",
        headerClassName: "dataForm-header",
        cellClassName: "dataForm-header",
        sortable: false,
      },
      {
        field: "yes",
        width: 100,
        headerName: "✔",
        headerAlign: "center",
        headerClassName: "dataForm-header",
        cellClassName: "dataForm-cell",
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => <span>✔</span>,
      },
      {
        field: "unknown",
        headerName: "?",
        width: 100,
        headerAlign: "center",
        cellClassName: "dataForm-cell",
        headerClassName: "dataForm-header",
        sortable: false,
      },
      {
        field: "no",
        headerName: "X",
        width: 100,
        headerAlign: "center",
        cellClassName: "dataForm-cell",
        headerClassName: "dataForm-header",
        sortable: false,
      },
    ];
    const getObejctPosition = (n: number) => {
      if (n === 1) {
        return "0";
      } else if (n === 2) {
        return "52%";
      } else if (n === 3) {
        return "102%";
      }
    };

    eventObject.participants.map((obj) => {
      //处理列
      const imgList: string[] = [];
      let objectPosition = "";
      obj.result.map((num) => {
        if (num === 1) objectPosition = "0";
        else if (num === 2) objectPosition = "52%";
        else if (num === 3) objectPosition = "102%";
      });
      columns.push({
        field: obj.name,
        width: 100,
        headerAlign: "center",
        headerClassName: "dataForm-header",
        headerName: "",
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              color={"#A52A2A"}
              onClick={() => {
                setShowAddForm((showAddForm) => true);
                setTextFieldValue(() => obj.name);
              }}
              component="button"
            >
              {params.field}
            </Link>
          </div>
        ),
        renderCell: (params: GridRenderCellParams) => (
          <img
            src={noIcon}
            style={{
              height: 25,
              width: 27,
              objectPosition: getObejctPosition(
                obj.result[(params.id as number) - 1]
              ),
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
        ),
      });
    });
    return columns;
  };

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={60}
        showCellVerticalBorder
        showColumnVerticalBorder
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        sx={{
          maxWidth: 100 * columns.length,
          "& .dataForm-header": { backgroundColor: "#f1f1f1" },
          "& .dataForm-cell": {
            justifyContent: "center",
          },
          "& .MuiDataGrid-root": {
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
          "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
            {
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
        }}
      />
      <div
        className="add-container"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: "500px",
        }}
      >
        {!showAddForm && (
          <Button
            variant="contained"
            sx={{
              width: 170,
              height: 170,
              borderRadius: "50%",
              margin: "0 auto",
              marginTop: "20px",
              fontSize: "22px",
              fontWeight: "600",
              textTransform: "none",
            }}
            onClick={() => {
              setShowAddForm((showAddForm) => !showAddForm);
            }}
          >
            Add Attendence
          </Button>
        )}
        {showAddForm && (
          <>
            <div className="add-header">Add attendance</div>
            <p className="event-detail">Name</p>
            <TextField
              size="small"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              defaultValue={textFieldValue}
            />
            <p className="event-detail">Schedule</p>
            {rows.map((obj) => (
              <div className="schedule-row">
                <span style={{ marginLeft: "20px" }}>{obj.Schedule}</span>
                <ToggleButtonGroup
                  value={selected}
                  exclusive
                  onChange={handleSelection}
                  aria-label="circular buttons"
                  sx={{ position: "absolute", right: 0 }}
                >
                  <ToggleButton value={1} className="toggle-button">
                    <CheckIcon />
                  </ToggleButton>
                  <ToggleButton value={2} className="toggle-button">
                    <QuestionMarkIcon />
                  </ToggleButton>
                  <ToggleButton
                    value={3}
                    className="toggle-button"
                    sx={{
                      marginRight: "20px",
                    }}
                  >
                    <ClearIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            ))}
            <p className="event-detail">Comment</p>
            <TextField
              size="small"
              fullWidth
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                width: 170,
                height: 170,
                borderRadius: "50%",
                margin: "0 auto",
                marginTop: "20px",
                fontSize: "22px",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  );
}

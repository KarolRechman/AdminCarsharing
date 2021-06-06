/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import api, { API_TYPES } from "../../actions/api";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

export default function CarList(props) {
    const columns = [
    { field: "manuf", headerName: "Manufacturer", width: 130 },
    { field: "model", headerName: "Model", width: 110 },
    { field: "color1", headerName: "Color", width: 110 },
    { field: "yofProd1", headerName: "Year of Prod.", width: 130 },
    { field: "kilometers1", headerName: "Km", width: 130 },
    { field: "priceDay1", headerName: "Price per day", width: 130 },
    { field: "isAvailable1", headerName: "Avaialability", width: 70 },
    { field: "insurance1", headerName: "Insurance to", width: 120 },
    { field: "segment1", headerName: "Segment", width: 70 },
    { field: "regNumbers1", headerName: "Registration number", width: 130 },
    { field: "techRev1", headerName: "Technical reviev to", width: 120 },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  const classes = useStyles();
  const [carList, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [href, setHref] = useState("/admin/Car/0");

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.request(API_TYPES.CAR).fetchAll();
      const updatedJson = request.data.map(
        ({
          idCar: id,
          manufacturer: manuf,
          model,
          color: color1,
          yofProd: yofProd1,
          kilometers: kilometers1,
          priceDay: priceDay1,
          isAvailable: isAvailable1,
          insurance: insurance1,
          segment: segment1,
          regNumbers: regNumbers1,
          filePath: filePath1,
          techRev: techRev1,
        }) => ({
          id,
          manuf,
          model,
          color1,
          yofProd1,
          kilometers1,
          priceDay1,
          isAvailable1,
          insurance1,
          segment1,
          regNumbers1,
          filePath1,
          techRev1,
        })
      );

      setData(updatedJson);
    };

    fetchData();
  }, []);
  return (
    <div>
      <GridContainer>
        {" "}
        <Container maxWidth="lg">
          <div style={{ height: 800, marginTop: 80 }}>
            <DataGrid
              rows={carList}
              columns={columns}
              pageSize={carList.length}
              id="idCar"
              hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
                let address = `/admin/Car/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Button variant="contained" color="primary" href={href}>
            Edytuj/dodaj Pojazd
          </Button>
        </Container>
      </GridContainer>
    </div>
  );
}

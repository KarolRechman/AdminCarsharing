/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api, { API_TYPES } from "../../actions/api";
import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const [spendings, setUpdatedSpendings] = useState([]);
  const [oldSpendings, setOldSpendings] = useState([]);
  const [filterSpendings, setFilterSpendings] = useState([]);
  const [cars, setCars] = useState([]);
  const [costs, setCosts] = useState([]);
  const [state, setState] = React.useState({
    carId: 0,
    costId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const request = await api
        .request(API_TYPES.SPENDINGS)
        .fetchSpendings("/" + props.match.params.id);

      const costsResponse = await api.request(API_TYPES.COSTS).fetchAll();
      const userCars = await api
        .request(API_TYPES.SPENDINGS)
        .fetchUserCars("/" + props.match.params.id);

      setCars(userCars.data);

      setCosts(costsResponse.data);
      let mapSpendings = await setSpendings(
        request.data,
        userCars.data,
        costsResponse.data
      );
      setOldSpendings(mapSpendings);
      setUpdatedSpendings(mapSpendings);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      setUpdatedSpendings(filterSpendings ? filterSpendings : spendings);
    };

    updateData();
  }, [filterSpendings]);

  const handleChange = (event) => {
    const name = event.target.id;

    setState({
      [name]: event.target.value,
    });

    if (event.target.value != 0) {
      let carSpendings = oldSpendings.filter(
        (x) => x.carID == event.target.value
      );
      setFilterSpendings(carSpendings);
    } else {
      setFilterSpendings(oldSpendings);
    }
  };

  async function setSpendings(spendings, cars, costs) {
    let userSpendings = spendings.filter((s) =>
      cars.find((c) => c.idCar == s.carID)
    );

    let newSpendings = userSpendings.map((spending) => {
      spending.date = spending.date.substring(0, spending.date.indexOf("T"));
      let carDesc = cars.find((car) => car.idCar === spending.carID);

      spending.carID = carDesc.model;
      let costDesc = costs.find((cost) => cost.idCosts === spending.costID);

      spending.costID = costDesc.description;
      delete spending.idSpendings;
      delete spending.idUser;

      return spending;
    });
    return newSpendings;
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
        <InputLabel htmlFor="carId">Select car</InputLabel>
        <Select
          native
          value={state.carId}
          onChange={handleChange}
          id="carId"
          required
          fullWidth="true"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{}}
        >
          <option aria-label="None" value="" />
          {cars.map((car, key) => (
            <option key={key} value={car.model}>
              {car.model}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Wydatki</h4>
            <p className={classes.cardCategoryWhite}>
              Lista ostatnich wydatków
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Date", "Car", "Cost", "Price"]}
              tableData={spendings.filter((x) => x.costID != "Przebieg")}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Przebieg</h4>
            <p className={classes.cardCategoryWhite}>kilometry</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Date", "Car", "Typ", "Ilość km"]}
              tableData={spendings.filter((x) => x.costID == "Przebieg")}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

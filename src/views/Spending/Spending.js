/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Select from "@material-ui/core/Select";
import api, { API_TYPES } from "../../actions/api";
import Modal from "../../components/Modal/Modal";

const useStyles = makeStyles((theme) => ({
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
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SpendingNew(props) {
  const classes = useStyles();
  const [costs, setCosts] = useState([]);
  const [cars, setCars] = useState([]);
  const [state, setState] = React.useState({
    carId: 0,
    costId: 0,
    price:0,
  });
  const [stateKm, setStateKm] = React.useState({
    carId: 0,
    km: 0,
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const costsResponse = await api.request(API_TYPES.COSTS).fetchAll();
      const userCars = await api
        .request(API_TYPES.SPENDINGS)
        .fetchUserCars("/" + props.match.params.id);

      setCosts(costsResponse.data);
      setCars(userCars.data);
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const name = event.target.id;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChangeKm = (event) => {
    const name = event.target.id;
    setStateKm({
      ...stateKm,
      [name]: event.target.value,
    });
  };

  const clearFields = () => {
    setStateKm({
      carId: 0,
      km: 0,
    });
    setState({
      carId: 0,
      costId: 0,
      price:0,
    });
  };

  async function SendData() {
    state.idSpendings = 0;
    state.Date = new Date().toISOString().slice(0, 10);
    state.idUser = props.match.params.id;

    if (stateKm.km != 0) {
      state.carId = parseInt(stateKm.carId);
      state.price = parseInt(stateKm.km);
      state.costId = 99;
    } else {
      state.carId = parseInt(state.carId);
      state.costId = parseInt(state.costId);
      state.price = parseInt(state.price);
    }

    await api.request(API_TYPES.SPENDINGS).create("/AddSpending/", state);
    setOpen(true);
    clearFields();
    // setRefresh(!refresh);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add spending</h4>
              <p className={classes.cardCategoryWhite}> Fill required fields</p>
            </CardHeader>
            <CardBody>
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
                      <option key={key} value={car.idCar}>
                        {car.model}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel htmlFor="cost">Cost type</InputLabel>
                  <Select
                    native
                    value={state.cost}
                    onChange={handleChange}
                    id="costId"
                    fullWidth="true"
                    required
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{}}
                  >
                    <option aria-label="None" value="" />
                    {costs
                      .filter((x) => x.idCosts != 99)
                      .map((cost, key) => (
                        <option key={key} value={cost.idCosts}>
                          {cost.description}
                        </option>
                      ))}
                  </Select>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Enter price"
                    id="price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: state.price,
                      type: "number",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData}>
                Dodaj wydatek
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add km</h4>
              <p className={classes.cardCategoryWhite}> Fill required fields</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel htmlFor="carId">Select car</InputLabel>
                  <Select
                    native
                    value={stateKm.carId}
                    onChange={handleChangeKm}
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
                      <option key={key} value={car.idCar}>
                        {car.model}
                      </option>
                    ))}
                  </Select>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Enter km"
                    id="km"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: handleChangeKm,
                      value: stateKm.km,
                      type: "number",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData}>
                Dodaj przebieg
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal
        open={open}
        onChange={handleClose}
        txt={"OK"}
        title={"Zaktualizowano"}
      />
    </div>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api, { API_TYPES } from "../../actions/api";


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

export default function CarProfile(props) {
  const [car, setCar] = useState({ idCar: 0 });
  const selectedCarId = props.match.params.id;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.id;
    setCar({
      ...car,
      [name]: event.target.value,
    });
  };

  async function SendData() {
    car.idCar = parseInt(car.idCar);
    car.yofProd = parseInt(car.yofProd);
    car.kilometers = parseInt(car.kilometers);
    car.priceDay = parseFloat(car.priceDay);
    car.isAvailable = parseInt(car.isAvailable);
    car.segment = parseInt(car.segment);
    car.insurance = new Date(car.insurance);
    car.techRev = new Date(car.techRev);

    if (car.idCar != 0) {
      await api.request(API_TYPES.CAR).update(car.id, car, );
    } else {
      await api.request(API_TYPES.CAR).create("/", car);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCarId != 0) {
        const request = await api
          .request(API_TYPES.CAR)
          .fetchById("/" + selectedCarId);

        setCar(request.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit/Add Car</h4>
              <p className={classes.cardCategoryWhite}>Complete Car Info</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Manufacturer"
                    id="manufacturer"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.manufacturer ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.manufacturer,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Model"
                    id="model"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.model ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.model,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Color"
                    id="color"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.color ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.color,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Year of production (yyyy)"
                    id="yofProd"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.yofProd ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.yofProd,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Kilometers"
                    id="kilometers"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.kilometers ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.kilometers,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Price per day"
                    id="priceDay"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.priceDay ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.priceDay,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Is available ? 0- no; 1- yes"
                    id="isAvailable"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.isAvailable ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.isAvailable,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Insurance valid from (yyyy-mm-dd)"
                    id="insurance"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.insurance ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.insurance,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Segment type 1 to 10"
                    id="segment"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.segment ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.segment,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Registration numbers"
                    id="regNumbers"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.regNumbers ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.regNumbers,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Path to photos"
                    id="filePath"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.filePath ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.filePath,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Technical review from (yyyy-mm-dd)"
                    id="techRev"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: car.techRev ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: car.techRev,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData}>
                Update Info
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

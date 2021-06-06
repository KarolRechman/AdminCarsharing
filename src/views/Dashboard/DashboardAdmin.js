/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api, { API_TYPES } from "../../actions/api";
import Button from "components/CustomButtons/Button.js";
import Modal from "../../components/Modal/Modal";
import {emailsSubscriptionChart,} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [expanded, setExpanded] = useState(false);
  const [carDesc, setData] = useState([{}]);
  const [spendings, setSpendings] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  let newCars = new Array();
  carDesc.forEach((element) => {
    let manufacturer;
    let model;
    let color;
    let yofProd;

    for (let [key, value] of Object.entries(element)) {
      if (key == "manufacturer") {
        manufacturer = value;
      }
      if (key == "model") {
        model = value;
      }
      if (key == "color") {
        color = value;
      }
      if (key == "yofProd") {
        yofProd = value;
      }
    }

    newCars.push({
      manufacturer: manufacturer,
      model: model,
      color: color,
      yofProd: yofProd,
    });
  });

  let newDatalabels = new Array();
  let newDataseries = new Array();

  var map = spendings.reduce(function (map, spending) {
    var date = spending.date;
    var price = +spending.price;
    map[date] = (map[date] || 0) + price;
    return map;
  }, {});

  var array = Object.keys(map).map(function (date) {
    return {
      date: date.substring(0, date.indexOf("T")),
      price: map[date],
    };
  });

  const sumValues = array.reduce((total, obj) => obj.price + total, 0);

  array.forEach((element) => {
    for (let [key, value] of Object.entries(element)) {
      if (key == "date") {
        newDatalabels.push(value.toString());
      }
      if (key == "price") {
        newDataseries.push(value.toString());
      }
    }
  });

  emailsSubscriptionChart.data.labels = newDatalabels;
  emailsSubscriptionChart.data.series = [newDataseries];

  let userId = props.match.params.id;

  async function SendData() {
    const emailAddress = localStorage.getItem("user");
    let email = {
      From: "CarsharingN3PAM@gmail.com",
      To: emailAddress,
      Subject: `Wydatki użytkownika ${emailAddress}`,
      Html: "",
      IdUser: userId,
    };

    await api.request(API_TYPES.SPENDINGS).sendEmail(email);
    setOpen(true);
  }


  useEffect(() => {
    const fetchData = async () => {
      const request = await api
        .request(API_TYPES.SPENDINGS)
        .fetchUserCars("/" + userId);
      const userSpendings = await api
        .request(API_TYPES.SPENDINGS)
        .fetchSpendings("/" + userId);

      setData(request.data);
      setSpendings(userSpendings.data);
    };

    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>payments</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Wydatki User</p>
              <h3 className={classes.cardTitle}>{sumValues} PLN</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Twoje wydatki
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>emoji_transportation</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Auta w użyciu</p>
              <h3 className={classes.cardTitle}>{carDesc.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Twoje auta
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <GridContainer
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <GridItem xs={6} sm={6} md={6}>
                  <h4 className={classes.cardTitle}>Wszystkie wydatki</h4>
                  <p className={classes.cardCategory}>rozłożone w czasie</p>
                </GridItem>

                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    color="primary"
                    onClick={SendData}
                  >
                    Wyślij Koszty mailem
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Zaktualizowano 2 minuty temu
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Samochody</h4>
              <p className={classes.cardCategoryWhite}>Twoje Samochody</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Producent", "Model", "Kolor", "Rok prod"]}
                tableData={newCars}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal
        open={open}
        onChange={handleClose}
        txt={"OK"}
        title={"Koszty Wysłane"}
      />
    </div>
  );
}

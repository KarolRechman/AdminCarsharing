/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
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
import Modal from "../../components/Modal/Modal";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});


  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const name = event.target.id;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const userOld = await api.request(API_TYPES.USER).fetchById("/" + props.match.params.id);
      setUser(userOld.data);
    };

    fetchData();
  }, []);

  async function SendData() {

    user.idUser = props.match.params.id
    await api.request(API_TYPES.USER).update(user.idUser, user).then(res => {
      setUser(res.data);
      setOpen(true)
    });

  }

  return (
    <div>
      <Modal open={open} onChange={handleClose} txt={'OK'} title={"Aktualizacja danych"}/>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="UserName"
                    formControlProps={{
                      fullWidth: true,

                    }}
                    labelProps={{
                      shrink: (user.UserName) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.UserName,


                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.Email) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.Email
                    }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Phone number"
                    id="PhoneNumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.PhoneNumber) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.PhoneNumber,
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="FirstName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.FirstName) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.FirstName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="LastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.LastName) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.LastName
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.City) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.City
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="Country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.Country) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.Country,

                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="PostCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelProps={{
                      shrink: (user.PostCode) ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: user.PostCode
                    }}
                  />
                </GridItem>
              </GridContainer>
              <div>{user.Ex}</div>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData} >Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

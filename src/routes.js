/* eslint-disable no-unused-vars */
/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { default as AdminDashboard } from "views/Dashboard/DashboardAdmin.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import SpendingNew from "views/Spending/Spending";
import CarProfile from "views/Car/Car";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import logList from "views/Logs/logs";
import CarList from "views/Car/CarList";
import CarAvailable from "views/Car/CarAvialable";

const dashboardRoutes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin",
    role: "All",
  },
  {
    path: "/CarList/:id",
    name: "Car List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component: CarList,
    layout: "/admin",
    role: "Admin",
  },
  {
    path: "/user/:id",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    role: "User",
  },
  {
    path: "/Spending/:id",
    name: "Add spending",
    rtlName: "ملف تعريفي للمستخدم",
    icon: MonetizationOnIcon,
    component: SpendingNew,
    layout: "/admin",
    role: "All",
  },
  {
    path: "/table/:id",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    role: "All",
  },
  {
    path: "/Car/:id",
    name: "Car",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component: CarProfile,
    layout: "/admin",
    role: "None",
  },
  {
    path: "/logs/:id",
    name: "Log List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: logList,
    layout: "/admin",
    role: "User",
  },
  {
    path: "/CarAvailable/:id",
    name: "Available cars",
    rtlName: "قائمة الجCarAvailableدول",
    icon: "content_paste",
    component: CarAvailable,
    layout: "/admin",
    role: "All",
  },
];

export default dashboardRoutes;

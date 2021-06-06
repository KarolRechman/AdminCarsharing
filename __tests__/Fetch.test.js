/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import Fetch from "../Fetch";
import TableMock from "../ComponentsToMock/TableMock";

afterEach(cleanup);
jest.setTimeout(2000);
test("loads and displays greeting", async () => {

  axiosMock.get.mockResolvedValueOnce({ data: { greeting: "hello there" } });

  const url = "/greeting";
  const { getByTestId } = render(<Fetch url={url} />);


  expect(getByTestId("loading")).toHaveTextContent("Loading data...");

  const resolvedSpan = await waitFor(() => getByTestId("resolved"));

 
  expect(resolvedSpan).toHaveTextContent("hello there");

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
});


test("loads and displays carlist", async () => {
  const columns = [
    { field: "manuf", headerName: "Manufacturer", flex: 0.3 },
    { field: "model", headerName: "Model", flex: 0.3 },
    { field: "color", headerName: "Color", flex: 0.3 },
    { field: "yofProd", headerName: "Year of Prod.", flex: 0.3 },
    { field: "priceDay", headerName: "Price per day", flex: 0.3 },
  ];

  const cars = [
    {
      id: 1,
      manuf: "opel",
      model: "sdhgf",
      color: "asd",
      yofProd: "12",
      priceDay: "12",
    },
  ];

  axiosMock.get.mockResolvedValueOnce({
    data: { columns: columns, cars: cars },
  });

  const url = "/car";
  const { getByTestId, debug } = render(<TableMock url={url} />);

  expect(getByTestId("loading")).toHaveTextContent("Loading data...");

  const resolvedSpan = await waitFor(() => getByTestId("resolved"));
  // debug();

  expect(resolvedSpan).toHaveTextContent("ManufacturerModelColoropelsdhgfasd");
});

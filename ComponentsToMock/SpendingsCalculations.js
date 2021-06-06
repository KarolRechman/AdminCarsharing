/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_TYPES } from "../src/actions/api";

async function convertFetch() {
  const result = await fetch(
    `${API_TYPES.SPENDINGS}`
  );
  if (!result.ok) {
    throw new Error(`Request failed with status code ${result.status}`);
  }
  const data = await result.json();
  return data;
}

async function convertAxios() {
  const result = await axios.get(
    `${API_TYPES.SPENDINGS}`
  );
  return result.data[0];
}

export { convertFetch as convert };
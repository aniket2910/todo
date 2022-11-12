import axios, { AxiosResponse } from "axios";
import { TodoType } from "../../Components/Types/Dashboard.types";
export const getData = async () => {
  try {
    let res = await axios.get("http://localhost:8080/todos");
    // let data: TodoType[] = res?.data;
    // console.log(da sta)
    return res;
  } catch (error) {
    console.log(error);
  }
};

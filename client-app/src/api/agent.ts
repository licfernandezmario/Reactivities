import axios, { AxiosResponse } from "axios";
import { IActivity } from "../app/layout/models/activity";
import { history } from "..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" || error.response === undefined) {
    toast.error("Network error - make sure API es running!");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.error.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for more info!!");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

//NOTE: Se agrego para que tenga un retraso y no lo haga tan brusco
//Se puede sacar la llamada esta a modo de ejemplo
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  detail: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

export default {
  Activities,
};

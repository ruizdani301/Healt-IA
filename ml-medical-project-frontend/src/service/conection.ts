import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

export function sendDataPredict<T>(objStates: Array<T>): {
  result: boolean;
  accuracy: string;
} {
  console.log(objStates[0]);
  const client = axios.create({
    baseURL: "https://httpbin.org",
  });

  (async () => {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: "application/json",
      } as RawAxiosRequestHeaders,
    };

    try {
      const data = { message: objStates[0] };
      const response: AxiosResponse = await client.post(`/post`, data, config);
      console.log(response.status);
      console.log(response.data.json);
    } catch (err) {
      console.log(err);
    }
  })();
  //   const result: boolean = true;
  //   const accuracy = "100%";
  //return { result, accuracy };
}

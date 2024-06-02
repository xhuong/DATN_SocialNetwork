export interface IDataResponse {
  status: 200 | 404 | 201 | 500;
  errorCode?: number;
  message?: string;
  data: [result: object | Array<any> | any];
  request: {
    url: string;
    method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  };
}

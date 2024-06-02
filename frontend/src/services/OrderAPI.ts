import { IBookBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum EOrderStatus {
  CREATED,
  PENDING_PAYMENT,
  PROCESSING,
  SHIPPING,
  DELIVERED,
  CANCELED,
  RETURNED,
}

export enum EPaymentMethod {
  COD,
  BANK_TRANSFER,
}

export interface IOrderBE {
  status: number;
  message: string;
  result: {
    data: IOrder[];
    status: number;
  };
}

export interface IOrder {
  id: number;
  order_date: Date;
  status: EOrderStatus;
  discount_id: number;
  user_id: number;
  Order_detail: IOrderDetail[];
  orderRelPayment: IOrderRelPayment[];
}

export interface IOrderDetail {
  id: number;
  book_id: number;
  order_id: number;
  amount: number;
  book: IBookBE;
}

export interface IOrderRelPayment {
  order_id: number;
  payment_id: number;
  payment: IPayment[];
}

export interface IPayment {
  id: number;
  payment_name: string;
  payment_method: EPaymentMethod;
}

export const OrderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getAllOrderByUserId: builder.query<IOrderBE, { id: number }>({
      query: ({ id }) => {
        return `order/user/${id}`;
      },
    }),
  }),
});

export const { useGetAllOrderByUserIdQuery, useLazyGetAllOrderByUserIdQuery } =
  OrderAPI;

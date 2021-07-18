import Cookies from "universal-cookie";
import CallApi from "../../utils/apiCaller";
import * as Types from "../constants/ActionTypes";

const cookies = new Cookies();
const idCookies = cookies.get("user");

console.log(idCookies);

export const getBillRequest = () => {
  return async (dispatch) => {
    try {
      const response = await CallApi(
        "GET",
        `/apt/getBill?id=${idCookies}`,
        null
      );
      console.log(response);
      dispatch(getBill(response?.data));
    } catch (error) {}
  };
};

export const getBill = (data) => {
  return {
    type: Types.GET_BILL,
    data,
  };
};

export const getCostRequest = () => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", "/apt/getCost", null);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostApartmentRequest = () => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", "/apt/getPost", null);
      response?.status === 200 && dispatch(getPostApartment(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostApartment = (data) => {
  return {
    type: Types.GET_POST_APARTMENT,
    data,
  };
};

export const createPaymentRequest = (id, tongTien) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("POST", "/create_payment_url", {
        id: id,
        orderType: "billpayment",
        amount: tongTien,
        bankCode: "",
        language: "vn",
      });
      response?.status === 200 && dispatch(createPayment(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPayment = (data) => {
  return {
    type: Types.CREATE_PAYMENT,
    data,
  };
};

export const paymentHistoryRequest = (id) => {
  return async (dispatch) => {
    try {
      const response = await CallApi(
        "GET",
        `/apt/getHistoryPay?id=${idCookies}`,
        null
      );
      response.status === 200 && dispatch(paymentHistory(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const paymentHistory = (data) => {
  return {
    type: Types.PAYMENT_HISTORY,
    data,
  };
};

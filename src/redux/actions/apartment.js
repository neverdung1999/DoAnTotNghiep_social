import CallApi from "../../utils/apiCaller";
import * as Types from "../constants/ActionTypes";

export const getPersonalByIdOfMeRequest = (id) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", `/user?id=${id}`, null);
      console.log(response?.data);
      dispatch(getPersonalByIdOfMe(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPersonalByIdOfMe = (data) => {
  return {
    type: Types.GET_PERSONAL_BY_ID_OF_ME,
    data,
  };
};

export const getBillRequest = (id) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", `/apt/getBill?id=${id}`, null);
      if (response?.status === 200) {
        dispatch(getBill(response?.data));
        dispatch(getPersonalByIdOfMeRequest(id));
      }
    } catch (error) {}
  };
};

export const getBill = (data) => {
  return {
    type: Types.GET_BILL,
    data,
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
        `/apt/getHistoryPay?id=${id}`,
        null
      );
      if (response?.status === 200) {
        dispatch(paymentHistory(response?.data));
        dispatch(getPersonalByIdOfMeRequest(id));
      }
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

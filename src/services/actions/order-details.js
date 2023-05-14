import {createAsyncThunk} from "@reduxjs/toolkit";
import {queryOrder} from "../../utils/http";

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (orderIds) => {
        return queryOrder(orderIds);
    })
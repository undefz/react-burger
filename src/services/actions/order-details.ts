import {createAsyncThunk} from "@reduxjs/toolkit";
import {queryPostOrder} from "../../utils/http";

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (orderIds: Array<string>) => {
        return queryPostOrder(orderIds);
    })
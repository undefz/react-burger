import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {TWSStoreActions} from "../middleware/socket-middleware";
import {TOrderList} from "../../utils/burger-prop-types";

const WS_CONNECTION_START = createAction<string>("wsOrder/Start")
const WS_CONNECTION_CLOSE = createAction("wsOrder/Close")

const WS_CONNECTION_SUCCESS = createAction("wsOrder/onSuccess")
const WS_CONNECTION_ERROR = createAction<string>("wsOrder/onError")
const WS_CONNECTION_CLOSED = createAction("wsOrder/onClosed")

export const WS_GET_ORDERS = createAction<TOrderList>("wsOrder/get")

export const orderHistoryActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,

    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,

    onMessage: WS_GET_ORDERS as ActionCreatorWithPayload<object>
}
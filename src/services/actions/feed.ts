import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {TWSStoreActions} from "../middleware/socket-middleware";
import {TFeedState} from "../reducers/feed";

const WS_CONNECTION_START = createAction<string>("wsFeed/Start")
const WS_CONNECTION_CLOSE = createAction("wsFeed/Close")

const WS_CONNECTION_SUCCESS = createAction("wsFeed/onSuccess")
const WS_CONNECTION_ERROR = createAction<string>("wsFeed/onError")
const WS_CONNECTION_CLOSED = createAction("wsFeed/onClosed")

export const WS_GET_ORDERS = createAction<TFeedState>("wsFeed/Orders")

export const feedActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,

    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,

    onMessage: WS_GET_ORDERS as ActionCreatorWithPayload<object>
}
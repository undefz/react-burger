import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";


export type TWSStoreActions = {
    wsInit: ActionCreatorWithPayload<string>,
    wsClose: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<object>,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<object>
}

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { wsInit, wsClose, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;

            if (wsInit.match(action)) {
                if (socket) {
                    socket.close();
                    socket = null;
                }
                const url = action.payload
                socket = new WebSocket(`${url}`);
            }
            if (wsClose.match(action)) {
                if (socket) {
                    socket.close();
                    socket = null;
                }
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = event => {
                    dispatch(onError(event.type));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                };

                socket.onclose = () => {
                    dispatch(onClose());
                };

                if (wsSendMessage && wsSendMessage.match(action)) {
                    const payload = action.payload;
                    // const message = { ...(payload as IMessage), token: user?.token };
                    socket.send(JSON.stringify(payload));
                }
            }

            next(action);
        };
    }) as Middleware;
};
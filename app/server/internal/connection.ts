import { WebApp } from "meteor/webapp";
import { Server, Socket } from "socket.io";
import * as http from "http";

export class Connection {
    private readonly token: string;
    private listener: Server;
    private socket: Socket | null;

    constructor(token: string) {
        this.token = token;
    }

    public init(server: http.Server) {
        this.listener = new Server(server);
        this.listener.use((socket, next) => {
            next(
                socket.handshake.auth.token === this.token
                    ? undefined
                    : new Error("unauthorized"),
            );
        });
    }

    private listen() {
        this.listener.on("connect", (socket) => {
            this.socket = socket;
            console.log("connected");

            socket.on("disconnect", () => {
                console.log("user disconnected");
                this.socket = null;
            });
        });
    }

    public get error() {
        return !!this.socket;
    }
}

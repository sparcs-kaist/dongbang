import { Server } from "socket.io";

export const useAuth = (io: Server, token?: string) => {
    if (!token) throw new Error("No token");

    io.use((socket, next) => {
        next(
            socket.handshake.auth.token !== token
                ? new Error("unauthorized")
                : undefined,
        );
    });
};

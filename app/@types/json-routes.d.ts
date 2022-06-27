declare namespace JsonRoutes {
    function add(
        method: "get" | "post" | "put" | "delete",
        path: string,
        handler: (request: Request, response: Response, next: () => void) => void
    ): void;
    
    function sendResult(
        response: Response,
        options?: {
            code?: number;
            headers?: { [key: string]: string };
            data?: any;
        }
    ): void;
    
    namespace Middleware {
        function use(
            handler: (request: Request, response: Response, next: () => void) => void,
        ): void;
    }
    

}

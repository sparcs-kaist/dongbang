JsonRoutes.Middleware.use((req, res, next) => {
    if (req.url.startsWith("/api")) {
        console.log("api request");
    }
    next();
})


class APIRouter {
    get<T>(path: string) {
        return (handler: (a: T) => void) => this.register(handler);
    }
    
    private register(handler: any) {
    }
}

const route = new APIRouter();

route.get<{res: string, qwer: string}>("/route/")
(({res, qwer}) => {

})

JsonRoutes.add("get", "/api/test", (req, res, next) => {
    
    
    JsonRoutes.sendResult(res, {
        data: {hello: "world"}
    });
});

function createRoute(app) {
    app.get('/', (req, res) => {
        console.log(req.query);

    });


    return app;

}




module.exports = createRoute;
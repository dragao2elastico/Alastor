module.exports = {
    name: "api", 
    params: ["req", "res"],
    handler: (req, res) => {
        try {
            res.send({
                "message": "Welcome to the API",
                "status_code": "200 OK"
            });
        } catch (error) {
            console.error("Error loading api: ", error);
            res.status(500).send("Error loading api: " + error.message);
        }
    }
};
module.exports = {
    name: "api", 
    params: ["req", "res"],
    get: (req, res) => {
        try {
            res.send({
                "message": "Welcome to the API",
                "status_code": 200
            });
        } catch (error) {
            console.error("Error loading api: ", error);
            res.status(500).send("Error loading api: " + error.message);
        }
    }
};
require("colors");

module.exports = {
    name: "music", 
    handler: (req, res, next) => {
        try {
        } catch (error) {
            console.error("An Error Occurred: ".red, error);
            res.status(500).send("An error ocurred: " + error.message);
        }
    }
};
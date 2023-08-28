require("colors");

module.exports = {
    name: "status", 
    handler: (req, res, next) => {
        try {
            res.json({
                "message": "Cancer",
                "status_code": 200
            });
        } catch (error) {
            console.error("Error loading api: ", error);
            res.status(500).json({
                    "message":"Internal Server Error",
                    "status_code":`${res.statusCode}`,
                    "Error info: ": error.message
                }
                
            );
        }
    }
};
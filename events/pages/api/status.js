require("colors");
const version = require("../../../server")

module.exports = {
    name: "status", 
    get: (req, res, next) => {
        try {
            const basicInfo = {
                name: "Server is:",
                status: "Online"
            };

            const basicDatabaseInfo = {
                connectionStatus: "Connected"
            };

            const advancedInfo = {
                version: version,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage()
            };

            const advancedDatabaseInfo = {
                lastQueryTime: new Date().toLocaleString()
            };

            res.json({
                "basic": {
                    "message": "Server Status",
                    "status_code": 200,
                    "info": basicInfo,
                    "database_info": basicDatabaseInfo
                },
                "advanced": {
                    "info": advancedInfo,
                    "database_info": advancedDatabaseInfo
                }
            });
        } catch (error) {
            console.error("Error loading api: ", error);
            res.status(500).json({
                "message": "Internal Server Error",
                "status_code": 500,
                "error_info": {
                    "error_message": error.message,
                    "error_stack": error.stack
                }
            });
        }
    }
};

// Main Server

import "dotenv/config";
import "./config/firebase.config.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    () => {
        console.log();
        console.log("🚀 Server started");
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
        console.log();
    }
);
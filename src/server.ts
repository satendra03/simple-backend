// Main Server
import "dotenv/config";
import "./config/firebase.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, 
    () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    }
);
const app = require("./app.js");
const config = require("./config/config.js");
const connectDB = require("./config/database.js");

const port = config.port;
connectDB();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
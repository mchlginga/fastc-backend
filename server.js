const app = require("./app");
const config = require("./config/index");
const connectDB = require("./config/database");

const port = config.port;
connectDB();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
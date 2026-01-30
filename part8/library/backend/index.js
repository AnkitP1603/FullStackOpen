const startServer = require("./server");
require("dotenv").config();
const connectToDatabase = require("./utils/db");

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const main = async () => {
    await connectToDatabase(MONGODB_URI);
    startServer(PORT);
}

main()

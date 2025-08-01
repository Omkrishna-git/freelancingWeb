const app = require("./app");
const dotenv = require("dotenv");
const dbConnection = require("./utils/db");
dotenv.config();
 
//PORT 
const PORT = process.env.PORT
const cors = require('cors');
app.use(cors());

// server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
    dbConnection();
})
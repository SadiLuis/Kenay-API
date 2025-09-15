import app from "./app.js";
import {PORT} from  "./config.js"

//const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running");
  // console.log(`Server is running on port ${PORT}`);
});

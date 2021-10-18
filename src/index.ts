import "./pre-start"; // Must be the first import
import app from "src/server";

// Start the server
const port = 4000;

app.listen(port, () => {
  console.log("Express server started on port: " + port);
});

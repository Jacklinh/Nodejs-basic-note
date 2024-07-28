import app from "./src/app";
import dotenv  from "dotenv";
dotenv.config();
const POST = 8080 || 3000;
app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
})
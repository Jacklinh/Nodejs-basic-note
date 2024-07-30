import app from "./src/app";
import { globalConfig } from "./src/constants/configs"
const POST = globalConfig.PORT || 3000;
app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
})
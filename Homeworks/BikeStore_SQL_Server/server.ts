import app from "./src/app";
import { myDataSource } from './src/databases/data-soucre'
import { globalConfig } from "./src/constants/configs"
const POST = globalConfig.PORT;
myDataSource
    .initialize()
    .then(() => {
        console.log("Kết nối với SQL Server thành công !")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


app.listen(POST, () => {
  console.log(`Example app listening on port http://localhost:${POST}`)
})
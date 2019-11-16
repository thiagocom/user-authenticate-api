const app = require("./src/app")

const port = app.get("port")

app.listen(port, () => console.log(`Application running on port ${ port }`))
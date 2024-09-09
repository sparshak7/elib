import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler"

const app = express()

app.get("/", (req, res, next) => {
  //fake error testing
  // const error = createHttpError(400, "something went wrong")
  // throw error
  res.json({
    message: "API working",
  })
})

// client -> router -> middleware (1 or more, next()) -> request handler (callback) -> global error handler
/* usually request handler sends the response to client but if there is an error in handler, we can use
next(error) to send the error to global error handler which sends the response to client instead */
//global error handler is ALWAYS at the end

app.use(globalErrorHandler)

export default app

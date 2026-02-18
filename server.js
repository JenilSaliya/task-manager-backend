import express from "express"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import connectDB from "./config/db.js"
import config from "./config/config.js"
import cors from "cors"
import { getLoginUser } from "./controllers/userControl.js"

const app = express()

const startServer = async () => {
  await connectDB()
  app.use(cors({
    origin: config.React_URI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }))
  // app.use(cors({}))
  app.use(express.json())

  app.use('/user', userRoutes)
  app.use('/task', taskRoutes)



  app.post('/login', async (req, res) => {
    try {

      const user = await getLoginUser(req.body.email, req.body.password)
      if (!user) {

        throw new Error('wrong id or password')

      }
      return res.send({ success: true, error: false, message: 'login Successfully', result: user })
    }
    catch (err) {
      return res.send({ success: false, error: true, message: err.message })
    }

  })

  app.get('/admin', (req, res) => {

    return res.send('admin')

  })

  app.get('/employee', (req, res) => {

    return res.send('employee')

  })

  const PORT = process.env.PORT || config.port || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer()
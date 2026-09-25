import { app } from './app'
import { config } from './config'

const port = config.port

app.listen(port, () => {
  console.log(`[ClimateTwin API] listening on http://localhost:${port}`)
})

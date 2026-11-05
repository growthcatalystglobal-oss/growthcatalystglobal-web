import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contactHandler from './api/contact.js'
import internHandler from './api/intern.js'

// Helper to create middleware handler for API functions
function createApiMiddleware(handler) {
  return async (req, res) => {
    if (req.method === 'POST') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        try {
          req.body = body ? JSON.parse(body) : {}
        } catch {
          req.body = {}
        }

        const mockRes = {
          setHeader(key, value) {
            res.setHeader(key, value)
          },
          status(code) {
            res.statusCode = code
            return {
              json(data) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              },
            }
          },
        }

        try {
          await handler(req, mockRes)
        } catch (err) {
          console.error('Dev server API handler error:', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, error: 'Internal server error.' }))
        }
      })
    } else {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Method not allowed.' }))
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GMAIL_USER) process.env.GMAIL_USER = env.GMAIL_USER
  if (env.GMAIL_APP_PASSWORD) process.env.GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD

  return {
    plugins: [
      react(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/contact', createApiMiddleware(contactHandler))
          server.middlewares.use('/api/intern', createApiMiddleware(internHandler))
        },
      },
    ],
    base: '/',
  }
})


require('dotenv').config()

export default {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || undefined,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || undefined,
  TRELLO_API_KEY: process.env.TRELLO_API_KEY || undefined,
  TRELLO_OAUTH_TOKEN: process.env.TRELLO_OAUTH_TOKEN || undefined
}

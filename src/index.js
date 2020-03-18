/**
 * Project entrypoint
 */

import { makeTrelloBoard } from './allTogetherNow'

async function process () {
  console.log('Starting process')
  const result = await makeTrelloBoard('Bob dylan discography - public')
  console.log(`Public short URL: ${result.shortUrl} boardId: ${result.id}`)
}

process()

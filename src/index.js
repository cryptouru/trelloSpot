/**
 * Project entrypoint
 */
import { makeTrelloBoard } from './allTogetherNow'

async function runProcess () {
  console.log('--- Starting process ---')
  const result = await makeTrelloBoard('Bob dylan discography - Public')
  if (!result) console.error('Something went wrong')
  else console.log(`Public short URL: ${result.shortUrl} boardId: ${result.id}`)
}

runProcess()

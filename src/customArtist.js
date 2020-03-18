import { makeTrelloBoard } from './allTogetherNow'

async function runProcess () {
  console.log('--- Starting process ---')
  let artist = process.argv[2]
  if (!artist) {
    console.log('Artist parameter missing defaulting to Bob Dylan')
    artist = 'Bob Dylan'
  }
  const result = await makeTrelloBoard(`${artist} Discography - Public`, artist)
  if (!result) console.error('Something went wrong')
  else console.log(`Public short URL: ${result.shortUrl} boardId: ${result.id}`)
}

runProcess()

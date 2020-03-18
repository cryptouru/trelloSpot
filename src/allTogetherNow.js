import { getDiscography } from './TxtParser'
import { getArtistAlbumsWithName } from './Spotify'
import { groupBy } from 'lodash'
import { createBoard, createList, createCard, addAttachementToCard } from './Trello'

export async function getAlbumsWithImages () {
  const discography = await getArtistAlbumsWithName('Bob Dylan')
  const txtDiscography = getDiscography()
  for (const album of txtDiscography) {
    const match = discography.find(disc => disc.name.toLowerCase() === album.name.toLowerCase())
    if (match) {
      album.image = match.images[0].url
    }
  }
  return txtDiscography
}

export async function getGroupedDiscography () {
  const discography = await getAlbumsWithImages()
  return groupBy(discography, 'decadeId')
}

export async function makeTrelloBoard (name) {
  const discography = await getGroupedDiscography()
  const newBoard = await createBoard({ name, prefs_permissionLevel: 'public' })
  for (const decade in discography) {
    const decadeArray = discography[decade]
    const newList = await createList({ name: decade, idBoard: newBoard.id, pos: 'bottom' })
    for (const album of decadeArray) {
      const newCard = await createCard({
        name: `${album.year} - ${album.name}`,
        desc: `${album.year} - ${album.name} \n  ${album.image || ''} `,
        idList: newList.id,
        pos: 'bottom'
      })
      if (album.image) { await addAttachementToCard(newCard.id, album.image) }
    }
  }
  return newBoard
}

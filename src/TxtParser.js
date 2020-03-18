import { readFileSync } from 'fs'
import path from 'path'

export function readDiscography () {
  const result = readFileSync(path.join(__dirname, '../files/discography.txt'))
  return result.toString()
}

export function getDiscography () {
  const albumsArray = readDiscography().split('\n').sort()
  const discography = albumsArray.map(album => {
    const year = album.substr(0, album.indexOf(' '))
    return {
      year,
      name: album.substr(album.indexOf(' ') + 1),
      decadeId: year.slice(0, 3) + 0
    }
  })
  return discography
}

/* eslint-disable no-undef */
import { assert } from 'chai'
import { getAlbumsWithImages, getGroupedDiscography, makeTrelloBoard, getAlbumsWithImagesWithArtistName } from '../../src/allTogetherNow'
import { deleteBoard } from '../../src/Trello'

describe('All together', () => {
  it('Gets txt albums with images', async () => {
    const result = await getAlbumsWithImages()
    assert.isArray(result)
    assert.exists(result[0].year)
    assert.exists(result[0].decadeId)
    assert.exists(result[0].image)
  }).timeout(3000)

  it('Gets albums with images using artist name', async () => {
    const result = await getAlbumsWithImagesWithArtistName('Tenacious D')
    assert.isArray(result)
    assert.exists(result[0].year)
    assert.exists(result[0].decadeId)
    assert.exists(result[0].image)
  }).timeout(6000)

  it('Gets grouped discography', async () => {
    const result = await getGroupedDiscography()
    assert.isObject(result)
    for (const key in result) {
      assert.isArray(result[key])
      assert.equal(result[key][0].decadeId, key, 'Not grouped by decade')
      assert.exists(result[key][0].image, 'Image not found')
      break
    }
  })

  it('Gets grouped discography with artist name', async () => {
    const result = await getGroupedDiscography('Iron Maiden')
    assert.isObject(result)
    for (const key in result) {
      assert.isArray(result[key])
      assert.equal(result[key][0].decadeId, key, 'Not grouped by decade')
      assert.exists(result[key][0].image, 'Image not found')
      break
    }
  })

  it('Makes full trello board process', async () => {
    const result = await makeTrelloBoard('Bob dylan discography - public')
    assert.exists(result.id, 'Does not include board ID')
    assert.exists(result.shortUrl, 'Does not include board shortUrl')
    await deleteBoard(result.id)
  }).timeout(0)

  it('Makes full trello board process with artist name', async () => {
    const artist = 'Tenacious D'
    const result = await makeTrelloBoard(`${artist} Discography - Public`, artist)
    assert.exists(result.id, 'Does not include board ID')
    assert.exists(result.shortUrl, 'Does not include board shortUrl')
    await deleteBoard(result.id)
  }).timeout(0)
})

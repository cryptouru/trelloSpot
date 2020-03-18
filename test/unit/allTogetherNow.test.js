/* eslint-disable no-undef */
import { assert } from 'chai'
import { getAlbumsWithImages, getGroupedDiscography, makeTrelloBoard } from '../../src/allTogetherNow'
import { deleteBoard } from '../../src/Trello'

describe('All together', () => {
  it('Gets txt albums with images', async () => {
    const result = await getAlbumsWithImages()
    assert.isArray(result)
  }).timeout(3000)

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

  it('Makes full trello board process', async () => {
    const result = await makeTrelloBoard('Bob dylan discography - public')
    assert.exists(result.id, 'Does not include board ID')
    assert.exists(result.shortUrl, 'Does not include board shortUrl')
    await deleteBoard(result.id)
  }).timeout(0)
})

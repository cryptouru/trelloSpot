/* eslint-disable no-undef */
import { assert } from 'chai'
import { getAlbumsWithImages, getGroupedDiscography, makeTrelloBoard } from '../../src/allTogetherNow'

describe('All together', () => {
  it('Gets txt albums with images', async () => {
    const result = await getAlbumsWithImages()
    assert.isArray(result)
  }).timeout(3000)

  it('Gets grouped discography', async () => {
    const result = getGroupedDiscography()
    assert.isObject(result)
    for (const key in result) {
      assert.isArray(result[key])
      assert.equal(result[key][0].decadeId, key, 'Not grouped by decade')
      assert.exists(result[key][0].image, 'Image not found')
    }
  })

  it('Maes full trello board process', async () => {
    const result = await makeTrelloBoard('Bob dylan discography')
  }).timeout(0)
})

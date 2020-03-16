/* eslint-disable no-undef */
import { assert } from 'chai'
import { readDiscography, getDiscography } from '../../src/TxtParser'

describe('TxtParser', () => {
  it('Reads discography', async () => {
    const result = readDiscography()
    assert.exists(result)
  })

  it('Gets discography', async () => {
    const result = getDiscography()
    assert.isArray(result)
    assert.exists(result[0].decadeId)
    assert.exists(result[0].year)
    assert.exists(result[0].name)
  })
})

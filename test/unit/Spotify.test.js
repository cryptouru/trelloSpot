/* eslint-disable no-undef */
import { assert } from 'chai'
import { searchArtist, getArtistAlbumsWithName, getArtistAlbums } from '../../src/Spotify'

describe('Spotify', () => {
// "74ASZWbe4lXaubB36ztrGX"
  it('Searches spotify', async () => {
    const result = await searchArtist('Bob Dylan')
    assert.exists(result.body)
    assert.exists(result.body.artists)
  })

  it('Gets all albums with name string', async () => {
    const result = await getArtistAlbumsWithName('Bob Dylan')
    assert.isArray(result)
  }).timeout(3000)

  it('Gets artist album', async () => {
    const result = await getArtistAlbums('74ASZWbe4lXaubB36ztrGX')
    assert.isArray(result)
  })
})

/**
 * Greeting class tests.
 */

import { assert } from 'chai';
import SpotifyWrapper from '../../src/Spotify';

describe('Spotify', () => {
// "74ASZWbe4lXaubB36ztrGX"
    it('Searches spotify', async () =>{
        const result = await SpotifyWrapper.searchArtist('Bob Dylan');
        assert.exists(result.body);
        assert.exists(result.body.artists);
    })

    it('Gets all albums with name string', async () =>{
        const result = await SpotifyWrapper.getArtistAlbumsWithName('Bob Dylan');
        assert.isArray(result);
    }).timeout(3000)

    it('Gets artist album', async () =>{
        const result = await SpotifyWrapper.getArtistAlbums('74ASZWbe4lXaubB36ztrGX');
        assert.isArray(result);
    })
});
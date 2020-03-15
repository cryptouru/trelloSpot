import { assert } from 'chai';
import {readDiscography, getDiscography, getGroupedDiscography} from '../../src/TxtParser';

describe('TxtParser', () => {
    it('Reads discography', async () =>{
        const result = readDiscography();
        assert.exists(result);
    })

    it('Gets discography', async () =>{
        const result = getDiscography();
        assert.isArray(result);
        assert.exists(result[0].decadeId);
        assert.exists(result[0].year);
        assert.exists(result[0].name);
    })

    it('Gets grouped discography', async () =>{
        const result = getGroupedDiscography();
        assert.isObject(result);
        for(const key in result) {
            assert.isArray(result[key]);
            assert.equal(result[key][0].decadeId, key, 'Not grouped by decade');
        }
    })
});
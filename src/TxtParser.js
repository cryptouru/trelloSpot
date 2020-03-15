import {readFileSync} from 'fs';
import {groupBy} from 'lodash';

export function readDiscography() {
    const result = readFileSync(__dirname + '/files/discography.txt');
    return result.toString();
}

export function getDiscography() {
    const albumsArray = readDiscography().split('\n').sort();
    const discography = albumsArray.map(album => {
        const year = album.substr(0,album.indexOf(' '));
        return {
            year,
            name: album.substr(album.indexOf(' ')+1),
            decadeId: year.slice(1,3)

        }
    });
    return discography;
}

export function getGroupedDiscography() {
    const discography = getDiscography();
    return groupBy(discography, 'decadeId');
}
/**
 * Project entrypoint
 */

import Greeting from './Greetings'
import { getGroupedDiscography } from './TxtParser'

const g = new Greeting('Test')
console.info(g.hello())

function process () {
  const orderedAlbums = getGroupedDiscography
}

import { TrelloNodeApi } from 'trello-node-api'

const apiKey = process.env.TRELLO_API_KEY || '814e4479ed8d54937ae3b0d7ce9425bb'
const oauthToken = process.env.TRELLO_OAUTH_TOKEN || '2026b9cda7370c0dcc53b7e1243df19b024b17c639315c1c9788a920ba0acd44'

const Trello = new TrelloNodeApi()
Trello.setApiKey(apiKey)
Trello.setOauthToken(oauthToken)

export function createBoard (boardOptions) {
  const defaults = {
    name: 'BOARD_NAME', // REQUIRED
    defaultLabels: false,
    defaultLists: false,
    desc: 'Board description.',
    keepFromSource: 'none',
    powerUps: 'all',
    prefs_permissionLevel: 'private',
    prefs_voting: 'disabled',
    prefs_comments: 'members',
    prefs_invitations: 'members',
    prefs_selfJoin: true,
    prefs_cardCovers: true,
    prefs_background: 'blue',
    prefs_cardAging: 'regular'
  }
  const data = { ...defaults, ...boardOptions }
  return Trello.board.create(data)
};

export function deleteBoard (boardId) {
  return Trello.board.del(boardId)
};

export function createList (listOptions) {
  const defaults = {
    name: 'LIST_NAME', // REQUIRED
    idBoard: 'BOARD_ID', // REQUIRED
    // idListSource: 'LIST_ID',
    pos: 'top'
  }
  const data = { ...defaults, ...listOptions }
  return Trello.list.create(data)
};

export function createCard (cardOptions) {
  const defaults = {
    name: 'CARD_NAME',
    desc: 'Card description',
    pos: 'top',
    idList: 'LIST_ID', // REQUIRED
    due: null,
    dueComplete: false,
    // urlSource: 'https://example.com',
    // fileSource: 'file',
    keepFromSource: 'attachments,checklists,comments,due,labels,members,stickers'
  }
  const data = { ...defaults, ...cardOptions }
  return Trello.card.create(data)
};

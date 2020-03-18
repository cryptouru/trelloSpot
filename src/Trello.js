import { TrelloNodeApi } from 'trello-node-api'
import axios from 'axios'

const apiKey = process.env.TRELLO_API_KEY || 'ddb32eba256c5b9a208b6d1e93029f20'
const oauthToken = process.env.TRELLO_OAUTH_TOKEN || 'fbaa076f5d16263b29e0ab61c790ea02369a24bf56ce4a16a936a04f9a5004ba'

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

export function addAttachementToCard (cardId, url) {
  const options = {
    method: 'POST',
    url: `https://api.trello.com/1/cards/${cardId}/attachments/`,
    params: { key: apiKey, token: oauthToken },
    data: { url }
  }
  return axios.request(options)
}

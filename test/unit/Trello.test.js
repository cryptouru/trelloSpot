/* eslint-disable no-undef */
import { assert } from 'chai'
import { createBoard, deleteBoard, createList, createCard, addAttachementToCard } from '../../src/Trello'

describe('Trello', () => {
  let idBoard
  let idList
  before(async () => {
    const board = await createBoard({
      name: 'Before Test board'
    })
    idBoard = board.id
    const list = await createList({
      name: 'Test List',
      idBoard
    })
    idList = list.id
  })
  describe('Trello borads', () => {
    it('Should create and delete a board', async () => {
      const result = await createBoard({
        name: 'Test board'
      })
      assert.exists(result.id, 'Board id missing')
      await deleteBoard(result.id) // Api wrapper does not return a testable parameter :(
    })
  })

  describe('Trello lists', () => {
    it('Should create a list', async () => {
      const result = await createList({
        name: 'Test list',
        idBoard
      })
      assert.exists(result.id, 'List id missing')
      assert.equal(result.idBoard, idBoard, 'Board incorrect missing')
    })
  })

  describe('Trello cards', () => {
    it('Should create a card', async () => {
      const result = await createCard({
        name: 'Test card',
        idList
      })
      assert.exists(result.id, 'card id missing')
      assert.equal(result.idList, idList, 'Incorrect list id')
    })
  })

  describe('Add attachement to card', () => {
    it('Should create a card', async () => {
      const result = await createCard({
        name: 'With attachement',
        idList
      })
      assert.exists(result.id, 'card id missing')
      assert.equal(result.idList, idList, 'Incorrect list id')
      const attResult = await addAttachementToCard(result.id, 'https://i.scdn.co/image/ab67616d0000b2735954a6441cc1d88011841d1c')
      assert.equal(attResult.status, 200, 'Status not 200 ok')
    })
  }).timeout(3000)

  after(async () => {
    await deleteBoard(idBoard)
  })
})

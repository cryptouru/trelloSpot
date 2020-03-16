/* eslint-disable no-undef */
import { assert } from 'chai'
import { createBoard, deleteBoard, createList, createCard, addAttachementToCard } from '../../src/Trello'

describe('Trello', () => {
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
        name: 'Test board',
        idBoard: '5e6d2f89c866ac8d874317aa'
      })
      assert.exists(result.id, 'List id missing')
      assert.equal(result.idBoard, '5e6d2f89c866ac8d874317aa', 'Board incorrect missing')
    })
  })

  describe('Trello cards', () => {
    it('Should create a card', async () => {
      const result = await createCard({
        name: 'Test card',
        idList: '5e6d322330ac9a1a005f1edb'
      })
      assert.exists(result.id, 'card id missing')
      assert.equal(result.idList, '5e6d322330ac9a1a005f1edb', 'Incorrect list id')
    })
  })

  describe('Add attachement to card', () => {
    it('Should create a card', async () => {
      const result = await createCard({
        name: 'With attachement',
        idList: '5e6d322330ac9a1a005f1edb'
      })
      assert.exists(result.id, 'card id missing')
      assert.equal(result.idList, '5e6d322330ac9a1a005f1edb', 'Incorrect list id')
      const attResult = await addAttachementToCard(result.id, 'https://i.scdn.co/image/ab67616d0000b2735954a6441cc1d88011841d1c')
    })
  })
})

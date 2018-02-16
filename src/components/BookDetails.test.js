import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'

import BookDetails from './BookDetails'

describe('<BookDetails />', () => {
  const book = {
    id: 'nggnmAEACAAJ',
    title: 'Learn React',
    subtitle: 'The essencial guide',
    authors: ['Tolken', 'Dan'],
    imageLinks : {
      smallThumbnail: ''
    },
    publisher: 'NewOrder'
  }
  const books = []
  const mockAPI = {
    BooksAPI: {
      get: jest.fn().mockReturnValue(Promise.resolve(book))
    }
  }
  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)
    const bookWrapper = wrapper.find('BookDetails')
    expect(bookWrapper).toHaveLength(1)
  })

  it('render a loader', () => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)
    const loader = wrapper.find('Loader')
    expect(loader).toHaveLength(1)
  })

  it('render a title', (done) => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)
    
    setTimeout(() => {
      wrapper.update()
      const bookWrapper = wrapper.find('BookDetails')
      expect(bookWrapper.find('.book-title').last().text()).toBe(book.title)
      done()
    }, 500)
    expect.assertions(1)
  }, 1500)

  it('render a <BookCover />', (done) => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)

    setTimeout(() => {
      wrapper.update()
      const bookWrapper = wrapper.find('BookDetails')
      const cover = bookWrapper.find('BookCover')
      expect(cover).toHaveLength(1)

      done()
    }, 500)
    expect.assertions(1)
  }, 1500)

  it('render a <BookAuthors />', (done) => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)
    
    setTimeout(() => {
      wrapper.update()
      const bookWrapper = wrapper.find('BookDetails')
      const comp = bookWrapper.find('BookAuthors')
      expect(comp).toHaveLength(1)
      
      done()
    }, 500)
    expect.assertions(1)
  }, 1500)

  it('render a <BookShelfChanger />', (done) => {
    const wrapper = mount(<MemoryRouter><BookDetails moveBook={mockBookMove} api={mockAPI}/></MemoryRouter>)
    
    setTimeout(() => {
      wrapper.update()
      const bookShelfChangerWrapper = wrapper.find('BookShelfChanger')
      expect(bookShelfChangerWrapper).toHaveLength(1)

      done()
    }, 500)
    expect.assertions(1)
  }, 1500)
})
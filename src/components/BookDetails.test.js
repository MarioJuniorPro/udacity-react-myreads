import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'

import BookDetails from './BookDetails'

describe('<BookDetails />', () => {
  const books = [
    {
      id: 'nggnmAEACAAJ',
      title: 'Learn React',
      subtitle: 'The essencial guide',
      authors: ['Tolken', 'Dan'],
      shelf: 'none',
      imageLinks: {
        smallThumbnail: ''
      },
      publisher: 'NewOrder'
    },
    {
      id: 'nggnmAEACAAX',
      title: 'Learn React Native',
      subtitle: 'The pro guide',
      authors: ['Dan', 'Mark'],
      shelf: 'none'
    }
  ]
  const book = books[0]
  let mockAPI = null
  let mockToast = null

  beforeEach(() => {
    mockAPI = {
      BooksAPI: {
        get: jest.fn().mockReturnValue(Promise.resolve(books[0])),
        getAll: jest.fn().mockReturnValue(Promise.resolve(books)),
        update: jest.fn(),
        search: jest.fn().mockReturnValue(Promise.resolve(books))
      }
    }
    mockToast = {
      info: jest.fn(),
      error: jest.fn(),
      POSITION: {
        TOP_CENTER: 0
      }
    }
  })

  it('renders without crashing', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )
    const bookWrapper = wrapper.find('BookDetails')
    expect(bookWrapper).toHaveLength(1)
  })

  it('notifify user if crash on mount', (done) => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={{}} toast={mockToast}/>
      </MemoryRouter>
    )
    setTimeout(() => {
      expect(mockToast.error.mock.calls).toHaveLength(1)
      done()
    }, 400)
  }, 10000)

  it('render a loader', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )
    const loader = wrapper.find('Loader')
    expect(loader).toHaveLength(1)
  })

  it('render a title', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    wrapper
      .find('BookDetails')
      .instance()
      .setState({ isLoading: false, book: book })
    wrapper.update()
    const bookWrapper = wrapper.find('BookDetails')
    expect(
      bookWrapper
        .find('.book-title')
        .last()
        .text()
    ).toBe(book.title)
  })

  it('render a <BookCover />', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )
    wrapper
      .find('BookDetails')
      .instance()
      .setState({ isLoading: false, book: book })
    wrapper.update()

    const bookWrapper = wrapper.find('BookDetails')
    const cover = bookWrapper.find('BookCover')
    expect(cover).toHaveLength(1)
  })

  it('render a <BookAuthors />', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    wrapper
      .find('BookDetails')
      .instance()
      .setState({ isLoading: false, book: book })
    wrapper.update()

    const bookWrapper = wrapper.find('BookDetails')
    const comp = bookWrapper.find('BookAuthors')
    expect(comp).toHaveLength(1)
  })

  it('render a <BookShelfChanger />', () => {
    expect.assertions(1)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    wrapper
      .find('BookDetails')
      .instance()
      .setState({ isLoading: false, book: book })
    wrapper.update()

    const bookShelfChangerWrapper = wrapper.find('BookShelfChanger')
    expect(bookShelfChangerWrapper).toHaveLength(1)
  })

  it('move books to a shelf', () => {
    expect.assertions(3)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    const searchBooksWrapper = wrapper.find('BookDetails')
    searchBooksWrapper.instance().moveBook({ ...book, shelf: 'wantToRead'})

    expect(mockAPI.BooksAPI.update.mock.calls).toHaveLength(1)
    expect(mockAPI.BooksAPI.update.mock.calls[0][0]).toMatchObject({ ...book, shelf: 'wantToRead'})
    expect(mockAPI.BooksAPI.update.mock.calls[0][1]).toBe('wantToRead')
  })

  it('notify when move book fails', (done) => {
    expect.assertions(2)
    const wrapper = mount(
      <MemoryRouter>
        <BookDetails api={{}} toast={mockToast}/>
      </MemoryRouter>
    )
    expect(mockToast.error.mock.calls).toHaveLength(1)
    const bookDetailsWrapper = wrapper.find('BookDetails')
    bookDetailsWrapper.instance().moveBook({ ...book, shelf: 'wantToRead'})
    setTimeout(() => {
      expect(mockToast.error.mock.calls).toHaveLength(2)
      done()
    }, 400)
  }, 10000)
})

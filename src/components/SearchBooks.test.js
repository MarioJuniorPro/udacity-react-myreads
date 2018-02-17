import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import SearchBooks from './SearchBooks'

describe('<SearchBooks />', () => {
  const books = [
    {
      id: 'nggnmAEACAAJ',
      title: 'Learn React',
      subtitle: 'The essencial guide',
      authors: ['Tolken', 'Dan'],
      shelf: 'none'
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
    const wrapper = shallow(<SearchBooks api={mockAPI} toast={mockToast} />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a grid of books', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )
    expect(wrapper.find('BookGrid')).toHaveLength(1)
  })

  it(
    'search by typing 2 or more characteres',
    done => {
      expect.assertions(2)
      const mockSearchBooks = jest.fn().mockImplementation((...arg) => {})
      const wrapper = mount(
        <MemoryRouter>
          <SearchBooks api={mockAPI} toast={mockToast} />
        </MemoryRouter>
      )
      expect(mockAPI.BooksAPI.update.mock.calls).toHaveLength(0)

      const searchBooksWrapper = wrapper.find('SearchBooks')
      searchBooksWrapper
        .find('DebounceInput')
        .simulate('change', { target: { value: 'React' } })

      setTimeout(() => {
        expect(mockAPI.BooksAPI.search.mock.calls).toHaveLength(1)
        done()
      }, 400)
    },
    10000
  )

  it('search for books', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    const searchBooksWrapper = wrapper.find('SearchBooks')
    const booksBeforeSearch = wrapper.find('BookGrid').find('Book')
    expect(booksBeforeSearch).toHaveLength(0)

    expect(mockAPI.BooksAPI.search.mock.calls).toHaveLength(0)
    searchBooksWrapper.instance().setSearchTerm('')
    expect(mockAPI.BooksAPI.search.mock.calls).toHaveLength(1)
  })

  it('move books to a shelf', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    const searchBooksWrapper = wrapper.find('SearchBooks')
    searchBooksWrapper.instance().setState({ books: books })
    searchBooksWrapper.instance().moveBook(book, 'wantToRead')

    expect(mockAPI.BooksAPI.update.mock.calls).toHaveLength(1)
    expect(mockAPI.BooksAPI.update.mock.calls[0][0]).toMatchObject(book)
    expect(mockAPI.BooksAPI.update.mock.calls[0][1]).toBe('wantToRead')
  })

  it('notify when move book fails', (done) => {
    mockAPI.BooksAPI.update = undefined
    expect.assertions(2)
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks api={mockAPI} toast={mockToast}/>
      </MemoryRouter>
    )
    expect(mockToast.error.mock.calls).toHaveLength(0)
    const searchBooksWrapper = wrapper.find('SearchBooks')
    searchBooksWrapper.instance().setState({ books: books })
    searchBooksWrapper.instance().moveBook({ ...book, shelf: 'wantToRead'}, 'wantToRead')
    setTimeout(() => {
      expect(mockToast.error.mock.calls).toHaveLength(1)
      done()
    }, 400)
  }, 10000)

  it('notify when search book fails', (done) => {
    mockAPI.BooksAPI.update = undefined
    expect.assertions(3)
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks api={{}} toast={mockToast}/>
      </MemoryRouter>
    )
  
    const searchBooksWrapper = wrapper.find('SearchBooks')
    expect(mockToast.error.mock.calls).toHaveLength(0)
    expect(mockAPI.BooksAPI.search.mock.calls).toHaveLength(0)
    searchBooksWrapper.instance().setSearchTerm('')
    setTimeout(() => {
      expect(mockToast.error.mock.calls).toHaveLength(1)
      done()
    }, 400)
  }, 10000)
})

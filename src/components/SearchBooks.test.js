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

  it('renders without crashing', () => {
    const mockSearchBooks = jest.fn()
    const wrapper = shallow(<SearchBooks searchBooks={mockSearchBooks} />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a grid of books', () => {
    const mockSearchBooks = jest.fn()
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks searchBooks={mockSearchBooks} />
      </MemoryRouter>
    )
    expect(wrapper.find('BookGrid')).toHaveLength(1)
  })

  it('search by typing 2 or more characteres', async (done) => {
    expect.assertions(2)
    const mockSearchBooks = jest.fn().mockImplementation((...arg) => {
    })
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks books={[]} searchBooks={mockSearchBooks} />
      </MemoryRouter>
    )

    expect(mockSearchBooks.mock.calls).toHaveLength(1)
    const searchBooksWrapper = wrapper.find('SearchBooks')
    searchBooksWrapper
      .find('DebounceInput')
      .simulate('change', { target: { value: 'React' } })

    await setTimeout(() => {
      expect(mockSearchBooks.mock.calls).toHaveLength(2)
      done()
    }, 1000)
  }, 5000)

  it('search for books', async () => {
    const mockSearchBooks = jest.fn().mockReturnValue(Promise.resolve(books))
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks books={[]} searchBooks={mockSearchBooks} />
      </MemoryRouter>
    )

    const searchBooksWrapper = wrapper.find('SearchBooks')
    const booksBeforeSearch = wrapper.find('BookGrid').find('Book')
    expect(booksBeforeSearch).toHaveLength(0)

    expect(mockSearchBooks.mock.calls).toHaveLength(1)
    searchBooksWrapper.instance().setSearchTerm('')
    expect(mockSearchBooks.mock.calls).toHaveLength(2)
  })

  it('move books to shelfs', async () => {
    const mockUpdateBook = jest.fn()
    const mockSearchBooks = jest.fn()
    const wrapper = mount(
      <MemoryRouter>
        <SearchBooks books={books} updateBook={mockUpdateBook} searchBooks={mockSearchBooks}/>
      </MemoryRouter>
    )

    const searchBooksWrapper = wrapper.find('SearchBooks')
    searchBooksWrapper.instance().moveBook(book, 'wantToRead')
    expect(mockUpdateBook.mock.calls).toHaveLength(1)
    expect(mockUpdateBook.mock.calls[0][0]).toMatchObject({
      ...book,
      shelf: 'wantToRead'
    })
  })
})

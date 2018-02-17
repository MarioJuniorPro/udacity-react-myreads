import React from 'react'
import ListBooks from './ListBooks'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme'

describe('<ListBooks />', () => {
  const books = [
    {
      id: 'nggnmAEACAAJ',
      title: 'Learn React',
      subtitle: 'The essencial guide',
      shelf: 'read',
      authors: ['Tolken', 'Dan']
    },
    {
      id: 'nggnmAEACAAX',
      title: 'Learn React Native',
      subtitle: 'The pro guide',
      shelf: 'read',
      authors: ['Dan', 'Mark']
    },
    {
      id: 'mggnmAEACAAX',
      title: 'React Native the good parts',
      subtitle: 'Guide for lazy people',
      shelf: 'wantToRead',
      authors: ['Dan', 'Mark']
    }
  ]

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
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <ListBooks api={mockAPI} toast={mockToast} />
      </MemoryRouter>
    )

    expect(wrapper).toHaveLength(1)
  })

  it('render shelf for each type', () => {
    const wrapper = shallow(<ListBooks api={mockAPI} toast={mockToast} />)
    const shelfs = wrapper.state().shelfs
    expect(wrapper.find('BookShelf')).toHaveLength(shelfs.length)
  })

  it('must filter books by type', () => {
    const wrapper = shallow(<ListBooks  api={mockAPI} toast={mockToast} />)
    const booksRead = wrapper.instance().getBooksByShelf(books, 'read')

    expect(booksRead.length).toBe(2)
  })

  it('move a book', (done) => {
    const wrapper = shallow(<ListBooks  api={mockAPI} toast={mockToast} books={books}/>)
    wrapper.instance().moveBook(books[0], 'wantToRead')
    setTimeout(() => {
      expect(wrapper.instance().state.books[0]).toMatchObject({ ...books[0], shelf: 'wantToRead' })
      done()
    }, 300)
  }, 1000)

  it('notify when move book fails', (done) => {
    expect.assertions(2)
    const wrapper = shallow(<ListBooks  api={mockAPI} toast={mockToast} />)
    expect(mockToast.error.mock.calls).toHaveLength(0)
    wrapper.setProps({api: {}})
    wrapper.instance().moveBook(books[0], 'wantToRead')
    setTimeout(() => {
      expect(mockToast.error.mock.calls).toHaveLength(1)
      done()
    }, 300)
  }, 10000)
})

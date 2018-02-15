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

  it('renders without crashing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <ListBooks books={books} />
      </MemoryRouter>
    )

    expect(wrapper).toHaveLength(1)
  })

  it('render shelf for each type', () => {
    const wrapper = shallow(<ListBooks books={books} />)
    const shelfs = wrapper.state().shelfs

    expect(wrapper.find('BookShelf')).toHaveLength(shelfs.length)
  })

  it('Method getBooksByShelf() must filter books by type', () => {
    const wrapper = shallow(<ListBooks books={books} />)
    const booksRead = wrapper.instance().getBooksByShelf('read')

    expect(booksRead.length).toBe(2)
  })

  it('Method moveBook() must update a book', () => {
    const updateBook = jest.fn()
    const wrapper = shallow(<ListBooks books={books} updateBook={updateBook} />)
    wrapper.instance().moveBook(books[1], 'wantToRead')
    const movedBook = updateBook.mock.calls[0][0]

    expect(updateBook.mock.calls.length).toBe(1)
    expect(movedBook).toMatchObject({ ...books[1], shelf: 'wantToRead' })
  })
})

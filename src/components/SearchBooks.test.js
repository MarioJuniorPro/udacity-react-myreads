import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import SearchBooks from './SearchBooks'

jest.useFakeTimers();

describe('<SearchBooks />', () => {

  // jest.useFakeTimers();

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
    const wrapper = shallow(<SearchBooks />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a grid of books', () => {
    const wrapper = mount(<MemoryRouter><SearchBooks /></MemoryRouter>)
    expect(wrapper.find('BookGrid')).toHaveLength(1)
  })

  it('search by typing 2 or more characteres', async () => {
    const mockSearchBooks = jest.fn().mockReturnValue(Promise.resolve(books));
    const wrapper = shallow(<SearchBooks searchBooks={mockSearchBooks} />)
    wrapper.find('DebounceInput').simulate('change', {target :{ value : 'React'}});
    expect(mockSearchBooks.mock.calls).toHaveLength(1)
  });
 
  it('search for books', async () => {
    const mockSearchBooks = jest.fn().mockReturnValue(Promise.resolve(books));
    const wrapper = shallow(<SearchBooks searchBooks={mockSearchBooks} />)
    const booksBeforeSearch = wrapper.find('BookGrid').find('Book')
    expect(booksBeforeSearch).toHaveLength(0)
    await wrapper.instance().setSearchTerm('')
    expect(mockSearchBooks.mock.calls).toHaveLength(1)
    expect(wrapper.state().books).toHaveLength(2)
    expect.assertions(3);
  });

  it('fails to search for books', async () => {
    const mockSearchBooks = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));
    const wrapper = shallow(<SearchBooks searchBooks={mockSearchBooks} />)
    const booksBeforeSearch = wrapper.find('BookGrid').find('Book')
    expect(booksBeforeSearch).toHaveLength(0)
    await wrapper.instance().setSearchTerm('')
    expect(mockSearchBooks.mock.calls).toHaveLength(1)
    expect(wrapper.state().books).toHaveLength(0)
    expect.assertions(3);
  });

  it('move books to shelfs', async () => {
    const mockUpdateBook = jest.fn().mockReturnValue(Promise.resolve(true));
    const wrapper = shallow(<SearchBooks updateBook={mockUpdateBook} />)
    wrapper.instance().setState({ books })
    await wrapper.instance().moveBook(book, "wantToRead")
    expect(mockUpdateBook.mock.calls).toHaveLength(1)
    expect(mockUpdateBook.mock.calls[0][0]).toMatchObject({...book, shelf: 'wantToRead'})
    expect(wrapper.state().books).toHaveLength(1)
    expect.assertions(3);
  });

  it('fails to move books to shelfs', async () => {
    const mockUpdateBook = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));
    const wrapper = shallow(<SearchBooks updateBook={mockUpdateBook} />)
    await wrapper.instance().moveBook(book, "wantToRead")
    expect(wrapper.state().books).toHaveLength(0)
  });
})

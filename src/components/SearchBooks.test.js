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
      authors: ['Tolken', 'Dan']
    },
    {
      id: 'nggnmAEACAAX',
      title: 'Learn React Native',
      subtitle: 'The pro guide',
      authors: ['Dan', 'Mark']
    }
  ]
  // const [book] = books
  const mockUpdateBook = jest.fn()
  const mockSearchBooks = jest.fn().mockReturnValue(Promise.resolve(books));
  
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchBooks />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a grid of books', () => {
    const wrapper = mount(<MemoryRouter><SearchBooks /></MemoryRouter>)
    expect(wrapper.find('BookGrid')).toHaveLength(1)
  })
 
  it('search for books', async () => {
    expect.assertions(3);
    const wrapper = shallow(<SearchBooks searchBooks={mockSearchBooks} />)
    const booksBeforeSearch = wrapper.find('BookGrid').find('Book')
    expect(booksBeforeSearch).toHaveLength(0)
    await wrapper.instance().setSearchTerm('')
    expect(mockSearchBooks.mock.calls).toHaveLength(1)
    expect(wrapper.state().books).toHaveLength(2)
  });

})

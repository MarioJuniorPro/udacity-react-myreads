import React from 'react'
import BookShelf from './BookShelf'

import { shallow, mount, render } from 'enzyme'

describe('<BookShelf />', () => {
  const title = 'Reading'
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

  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = shallow(<BookShelf books={books} title={title} moveBook={mockBookMove} />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a title', () => {
    const wrapper = shallow(<BookShelf books={books} title={title} moveBook={mockBookMove} />)
    expect(wrapper.find('.bookshelf-title').text()).toBe(`${title} (${books.length})`)
  })

  it('render some books', () => {
    const wrapper = shallow(<BookShelf books={books} title={title} moveBook={mockBookMove} />)
    const bookElements = wrapper.find('Book')
    expect(bookElements).toHaveLength(books.length)
  })

  it('render a <BookShelfChanger /> if passed to a <Book />', () => {
    const wrapper = shallow(<BookShelf books={books} title={title} moveBook={mockBookMove} />)
    const bookElements = wrapper.find('BookShelfChanger')
    expect(bookElements).toHaveLength(books.length)
  })
})

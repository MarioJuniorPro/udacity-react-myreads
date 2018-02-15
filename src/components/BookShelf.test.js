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

  it('render a BookGrid', () => {
    const wrapper = shallow(<BookShelf books={books} title={title} moveBook={mockBookMove} />)
    const bookGrid = wrapper.find('BookGrid')
    expect(bookGrid).toHaveLength(1)
  })
})

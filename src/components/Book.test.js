import React from 'react'
import Book from './Book'
import BookShelfChanger from './BookShelfChanger'

import { shallow, mount, render } from 'enzyme'

describe('<Book />', () => {
  const book = {
    id: 'nggnmAEACAAJ',
    title: 'Learn React',
    subtitle: 'The essencial guide',
    authors: ['Tolken', 'Dan']
  }

  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = shallow(<Book book={book} onMove={mockBookMove} />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a title', () => {
    const wrapper = mount(<Book book={book} onMove={mockBookMove} />)
    expect(wrapper.find('.book-title').text()).toBe(book.title)
  })

  it('render a <BookCover />', () => {
    const wrapper = mount(<Book book={book} onMove={mockBookMove} />)
    const cover = wrapper.find('BookCover')
    expect(cover).toHaveLength(1)
  })

  it('render a <BookAuthors />', () => {
    const wrapper = mount(<Book book={book} onMove={mockBookMove} />)
    const comp = wrapper.find('BookAuthors')
    expect(comp).toHaveLength(1)
  })

  it('render a <BookShelfChanger /> children', () => {
    const wrapper = mount(<Book book={book}><BookShelfChanger book={book} onMove={mockBookMove} /></Book>)
    const comp = wrapper.find('BookShelfChanger')
    expect(comp).toHaveLength(1)
    // console.log(wrapper.debug())
  })
})

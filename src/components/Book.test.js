import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme'

import Book from './Book'
import BookShelfChanger from './BookShelfChanger'


describe('<Book />', () => {
  const book = {
    id: 'nggnmAEACAAJ',
    title: 'Learn React',
    subtitle: 'The essencial guide',
    authors: ['Tolken', 'Dan'],
    imageLinks : {
      smallThumbnail: ''
    }
  }

  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = shallow(<MemoryRouter><Book book={book} onMove={mockBookMove} /></MemoryRouter>)
    const bookWrapper = wrapper.find('Book')
    expect(bookWrapper).toHaveLength(1)
  })

  it('render a title', () => {
    const wrapper = mount(<MemoryRouter><Book book={book} onMove={mockBookMove} /></MemoryRouter>)
    const bookWrapper = wrapper.find('Book')
    expect(bookWrapper.find('.book-title').last().text()).toBe(book.title)
  })

  it('render a <BookCover />', () => {
    const wrapper = mount(<MemoryRouter><Book book={book} onMove={mockBookMove} /></MemoryRouter>)
    const bookWrapper = wrapper.find('Book')
    const cover = bookWrapper.find('BookCover')
    expect(cover).toHaveLength(1)
  })

  it('render a <BookAuthors />', () => {
    const wrapper = mount(<MemoryRouter><Book book={book} onMove={mockBookMove} /></MemoryRouter>)
    const bookWrapper = wrapper.find('Book')
    const comp = bookWrapper.find('BookAuthors')
    expect(comp).toHaveLength(1)
  })

  it('render a <BookShelfChanger /> children', () => {
    const wrapper = mount(<MemoryRouter><Book book={book} onMove={mockBookMove}><BookShelfChanger book={book} onMove={mockBookMove} /></Book></MemoryRouter>)
    const bookShelfChangerWrapper = wrapper.find('BookShelfChanger')
    expect(bookShelfChangerWrapper).toHaveLength(1)
  })
})

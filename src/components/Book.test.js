import React from 'react'
import Book from './Book'

import { shallow, mount, render } from 'enzyme'

describe('<Book />', () => {
  const book = {
    title: 'Learn React',
    subtitle: 'The essencial guide'
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<Book book={book}/>)
    expect(wrapper).toHaveLength(1)
  })

  it('render a title', () => {
    const wrapper = mount(<Book book={book}/>)
    expect(wrapper.find('.book-title').text()).toBe(book.title)
  })

  it('render a cover', () => {
    const wrapper = mount(<Book book={book}/>)
    const cover = wrapper.find('BookCover')
    expect(cover).toHaveLength(1)
    // console.log(wrapper.debug())
  })
})

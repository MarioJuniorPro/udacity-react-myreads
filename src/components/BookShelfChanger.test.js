import React from 'react'
import BookShelfChanger from './BookShelfChanger'

import { shallow, mount, render } from 'enzyme'

describe('<BookShelfChanger />', () => {
  const book = {
    id: 'nggnmAEACAAJ',
    title: 'Learn React',
    subtitle: 'The essencial guide',
    authors: ['Tolken', 'Dan']
  }

  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = shallow(<BookShelfChanger book={book} onMove={mockBookMove} />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a select', () => {
    const wrapper = shallow(<BookShelfChanger book={book} onMove={mockBookMove} />)
    const select = wrapper.find('select')
    expect(wrapper).toHaveLength(1)
  })

});
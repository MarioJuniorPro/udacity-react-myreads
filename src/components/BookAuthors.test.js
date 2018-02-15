import React from 'react'
import BookAuthors from './BookAuthors'

import { shallow, mount, render } from 'enzyme'

describe('<BookAuthors />', () => {

  const authorsStr = "John, Jane"
  const authorsArray = ["John", "Jane"]

  it('renders without crashing', () => {
    const wrapper = shallow(<BookAuthors />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a authors using String', () => {
    const wrapper = shallow(<BookAuthors authors={authorsStr}/>)
    expect(wrapper.find('.book-authors').text()).toBe("John, Jane")
  })

  it('render a authors using a Array', () => {
    const wrapper = shallow(<BookAuthors authors={authorsArray}/>)
    expect(wrapper.find('.book-authors').text()).toBe("John, Jane")
  })
  
})

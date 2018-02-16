import React from 'react'
import App from './App'

import { shallow, mount, render } from 'enzyme'

describe('<App />', () => {
  const books = []
  const mockAPI = {
    BooksAPI: {
      getAll: jest.fn().mockReturnValue(books)
    }
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App api={mockAPI} />)
    expect(wrapper).toHaveLength(1)
  })

  it('have inital state', () => {
    const wrapper = shallow(<App api={mockAPI} />)
    const initialState = {
      books: [],
      isLoading: true
    }
    expect(wrapper.state()).toMatchObject(initialState)
  })

  it('show loader', () => {
    expect.assertions(2)

    const wrapper = mount(<App api={mockAPI} />)

    expect(wrapper.find('Loader')).toHaveLength(1)
    expect(wrapper.find('ListBooks')).toHaveLength(0)
  })
})

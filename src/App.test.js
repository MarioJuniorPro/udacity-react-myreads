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
    expect.assertions(2);

    const wrapper = mount(<App api={mockAPI} />)
    // console.log(wrapper.debug())
    // console.log(
    //   wrapper.find('Router'),
    //   wrapper.find('Loader'),
    //   wrapper.find('.app')
    // )
    // console.log(wrapper.instance().state)

    expect(wrapper.find('Loader')).toHaveLength(1)
    expect(wrapper.find('ListBooks')).toHaveLength(0)
  })

  // it('should crash without api', () => {
  //   // const wrapper = mount(<App />)

  //   const renderComponent = () => {
  //     try {
  //       const wrapper = mount(<App />)
  //       wrapper.instance()
  //     } catch (error) {
  //       console.log(wrapper)
  //       console.error(error)
  //       throw new Error(error)
  //     }
  //   }
  //   expect(renderComponent).toThrow()

  // })
  // console.log(wrapperShallow.debug())
  // console.log(wrapperMount.debug())
  // console.log(wrapperRender.html())
})

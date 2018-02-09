import React from 'react'
import Loader from './Loader'

import { shallow, mount, render } from 'enzyme'

describe('<Loader />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Loader />)
    expect(wrapper).toHaveLength(1)
  })

  it('render a image', () => {
    expect.assertions(2)

    const wrapper = shallow(<Loader />)

    expect(wrapper.is('.loader')).toBeTruthy()
    expect(wrapper.find('img')).toHaveLength(1)
  })
})

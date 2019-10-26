import {configure, shallow} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter: new Adapter()});


describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });


    it('should render 2 nav item if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 nav item if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should show log out nav item', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">log out</NavigationItem>)).toEqual(true);
    });

});
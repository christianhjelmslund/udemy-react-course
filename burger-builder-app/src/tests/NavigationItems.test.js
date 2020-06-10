import React from "react";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import NavigationItems from "../components/Navigation/Navigationitems/NavigationItems"
import NavigationItem from "../components/Navigation/Navigationitems/NavigationItem"

configure({adapter: new Adapter()})

describe("<NavigationItems/>", () => {
    // shallow is used to only copy the specific element and give all the nested elements
    // placeholders - the purpose is to test this specific element and not it subelements.

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it("should return two <NavigationItems> elements if not authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)

    })
    it("should return three <NavigationItems> elements if authenticated", () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it("should contain <NavigationItem> with logout properties", () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })

})
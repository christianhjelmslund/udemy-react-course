import React from "react";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import {BurgerBuilder} from "../containers/BurgerBuilder";
import BuildControls from "../components/Burger/BuildControls/BuildControls"

configure({adapter: new Adapter()})

describe("<BurgerBuilder/>", () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it("should render <BuildControls/> if ingredients are set", () => {
        wrapper.setProps({ingredients: {salad: true}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})


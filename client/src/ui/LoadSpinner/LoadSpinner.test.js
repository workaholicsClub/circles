import React from "react";
import { shallow } from 'enzyme';
import LoadSpinner from "./LoadSpinner";

test("Отрисовка компонента", function () {
    const wrapper = shallow(<LoadSpinner />);
    expect(wrapper.find('.cssload-loader-line-wrap')).toHaveLength(3);
});
import React from "react";
import { mount, shallow } from 'enzyme';
import SexInput from "./SexInput";

test("Отрисовка компонента", function () {
    const wrapper = shallow(<SexInput />);
    expect(wrapper.find({value: 'male'})).toHaveLength(1);
    expect(wrapper.find({value: 'female'})).toHaveLength(1);
});

test("Изменение данных", function () {
    return new Promise(function (resolve, reject) {
            const clickHandler = function (event) {
                let value = event.target.value;

                try {
                    expect(value).toEqual('female');
                    resolve(wrapper);
                }
                catch (exception) {
                    reject(exception);
                }
            };

            let wrapper = mount(<SexInput onChange={clickHandler}/>);
            let femaleButton = wrapper.find({value: 'female'});
            femaleButton.simulate('change');
        })
        .then(function (wrapper) {
            expect(wrapper.state('sex')).toEqual('female');
        });
});
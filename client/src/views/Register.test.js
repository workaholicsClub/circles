import React from "react";
import { mount, shallow } from 'enzyme';

import Register from "./Register";

let userProps = {
    name: undefined,
    sex: undefined,
    birthday: undefined,
};

test("Отрисовка компонента", function () {
    const wrapper = mount(<Register user={userProps}/>);
    expect(wrapper.find('input')).toHaveLength(4);
});

test("Установка глобального состояния", async () => {
    let expectedUuid = '8181953a-e956-4848-9b11-a37bc6eb5034';
    let changeHandler = jest.fn();
    let registerHandler = jest.fn();

    const wrapper = mount(<Register
        user={userProps}
        onNameChange={changeHandler}
        onSexChange={changeHandler}
        onBirthdayChange={changeHandler}
        onRegister={registerHandler}
    />);

    let maleButton = wrapper.find({value: "male"});
    let nameInput = wrapper.find({name: "name"});
    let birthdayInput = wrapper.find({name: "birthday"});
    let form = wrapper.find("form");

    await maleButton.simulate("change");
    await nameInput.simulate("change", {target: {value: "Константин Константинопольский"}});
    await birthdayInput.simulate("change", {target: {value: "1983-03-01"}});

    global.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                headers: {
                    get: function () {
                        return ["application/json"];
                    }
                },
                json: function() {
                    return {uuid: expectedUuid};
                }
            });
        });
    });
    await form.simulate("submit");

    jest.useFakeTimers();
    await jest.runAllTimers();

    expect(changeHandler).toHaveBeenCalledTimes(3);
    expect(registerHandler).toHaveBeenCalledTimes(1);

    expect(changeHandler.mock.calls[0][0]).toEqual("male");
    expect(changeHandler.mock.calls[1][0]).toEqual("Константин Константинопольский");
    expect(changeHandler.mock.calls[2][0]).toEqual("1983-03-01");
    expect(registerHandler.mock.calls[0][0]).toEqual({uuid: expectedUuid});
});
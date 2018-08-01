import { observable, action } from 'mobx';
import axios from 'axios';

import { ROOT_URL } from '../helpers/constants';

class User {
  @observable id = null;
  @observable profile=null;
  @observable isLoading = false;
  @observable error = null;

  @action async logIn(params) {
    let error;

    const request = await axios.post(`${ROOT_URL}validate`, {
      ...params      
    })
      .then(res => res)
      .catch(err => {
        error = err.message === 'Network Error' ? 'Сервер не доступен' : err.message
      });

    if (request) {
      const { data } = request
      if (data.status === 'err') {
        error = 'Имя пользователя или пароль введены не верно'
      } else {
        this.id = data.data.id
      }
    }
    return error;
  }

  @action logOut () {
    this.id = null;
  }

  @action async fetchProfile(id) {
    if(id === this.id && this.profile) {      
      return
    }
    
    this.isLoading = true

    let error=null;
    const request = await axios.get(`${ROOT_URL}/user-info/${this.id}`)
      .then(res=>res)
      .catch(err=>{
        error = err.message === 'Network Error' ? 'Сервер не доступен' : err.message
      });
    
    if(request) {      
      const {data} = request;      
      if (data.status === 'err') {
        error = 'Профиль не найден'
      } else {
        let profile = data.data        
        const social = [profile.social.filter(el => el.label === 'web')[0]]    
        //eslint-disable-next-line
        profile.social.map(el=> {
          if(el.label !== 'web') {
            social.push(el)
          }
        })
        profile.social = social;
        this.profile = profile;        
      }
    }
    this.isLoading = false
    this.error = error
  }
}

export default new User()

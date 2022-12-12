import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._basket = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    
    get isAuth() {
        return this._isAuth
    }

    setUser(user) {
        this._user = user
    }

    get user() {
        return this._user
    }

    setBasket(basket) {
        this._basket = basket
    }

    get basket() {
        return this._basket
    }
}
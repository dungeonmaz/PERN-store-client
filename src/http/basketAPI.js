import { $authHost } from "./index";

export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get('api/basket/' + userId)
    return data
}

export const addDeviceToBasket = async (userId, deviceId) => {
    const {data} = await $authHost.post('api/basket', {userId, deviceId})
    return data
}

export const removeDeviceFromBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}
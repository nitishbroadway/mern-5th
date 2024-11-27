export const inStorage = (key, value, remember = false) => {
    remember ? 
        localStorage.setItem(key, value) : 
        sessionStorage.setItem(key, value)
}

export const fromStorage = key => {
    return localStorage.getItem(key) || sessionStorage.getItem(key)
}

export const removeStorage = key => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
}

export const validationError = (response, formik) => {
    if (response?.data?.validation) {
        for (let k in response?.data?.validation) {
            formik.setFieldError(k, response?.data?.validation[k])
        }
    }
}
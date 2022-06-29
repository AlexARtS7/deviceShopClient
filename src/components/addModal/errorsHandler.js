
export const errorsHandler = (value) => {
    let checkRes = ''
    if(!value) checkRes = '! заполните поле'
    if(value.length > 50) checkRes = '! максимум 50 символов'
    return checkRes
}


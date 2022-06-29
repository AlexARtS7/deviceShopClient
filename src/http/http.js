// const baseUrl = 'http://testphp/'
const baseUrl = 'http://enginpm6.beget.tech/'

export const saveData = async(requestData) => {
    
    const result =  await fetch(`${baseUrl}post_data.php`, {
        method: 'POST', 
        body: requestData
      })
      return result
}

export const getData = async() => {
    const result = await fetch(`${baseUrl}get_data.php`)
    return result
}

export const deleteData = async(id) => {
    const result =  await fetch(`${baseUrl}delete_data.php?id=${id}`)
      return result
}
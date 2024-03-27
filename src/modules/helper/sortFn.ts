
// функция разбивки строки на параметры для фильтрации
export const sortFnProduct = (param: string) => {
  const obj: { [key: string]: string[] } = {}
  const _ = param.split('f_').map((x) => {
    if (x !== '') {
      // Формирования ключа и параметров фильтра
      const key = x.split('_vl_')
      const value = key
        .slice(1)
        .map((g) => g.split('q_'))
        .flat()
        .slice(1)

      // Удаление и замена знаков "+" и ","

      const result = value.map((x) => {
        const strArray: string[] = []
        let regex = /\§/g
        for (let str of x) {
          strArray.push(str === '§' ? str.replace(regex, '+') : str)
        }
        let resultString = strArray.join('')
        if (x.endsWith(',')) {
          const delComma = resultString.slice(0, resultString.length - 1)
          return delComma
        }
        return resultString
      })
      obj[key[0]] = result
    }
  })
  return obj
}


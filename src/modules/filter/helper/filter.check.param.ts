import { ParamFilter, TypeAcc } from '../dto/filter.dto'

// Фильтрация параметров продуктов на уникальные

class FilterParam {
  someParams: ParamFilter[]
  obj: {
    [key: string]: string[]
  }
}

export const filterParam = ({ someParams: data, obj }: FilterParam) => {
  const keyParent = Object.keys(obj).map((v) => v)

  const doubleParams = data.reduce((acc: TypeAcc[], item) => {
    const symbols = ['-', '', null, undefined, 'undefined', 'null']

    if (!symbols.includes(item.value)) {
      const existingItem = acc.find((x) => x.key === item.key)
      if (existingItem) {
        acc.forEach(({ key, value }) => {
          if (key == item.key && !value.includes(item.value.toUpperCase())) {
            value.push(item.value.toUpperCase())
          }
        })
      } else {
        const newItem = {
          id: item.productId,
          key: item.key,
          value: [item.value.toUpperCase()],
        }
        if (keyParent.includes(item.key)) {
          acc.unshift(newItem)
        } else {
          acc.push(newItem)
        }
      }
    }
    return acc
  }, [])

  // Количество возвращаемых параметров
  // const finalResultArray = doubleParams.filter((x) => {
  //   if (x.value.length !== 0) return x
  // })

  return doubleParams
}

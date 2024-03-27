

// Функция создания плоского массива всех групп

import { Category } from "@prisma/client"
import { ICategory, IChildrenCategory } from "../dto/category.dto"

export const categoryFlatArray = (data: ICategory[], id: number) => {
  const flatCategory: Category[] = []
  const finaleCategory: Category[] = []

  const addCategoryArray = (category: IChildrenCategory[]) => {
    category.map(r => {
      if (!checkCategory(r.id)) {
        flatCategory.push({
          id: r.id,
          name: r.name,
          parentCategoryId: r.parentCategoryId,
          slug: r.slug,
          img: r.img,
          description: r.description,
          folderImg: r.folderImg,
        })
      }
    })
  }

  const checkCategory = (idCategory: number) => {
    const result = flatCategory.find(x => x.id == idCategory)
    return result
  }

  const parentCategory = () => {
    for (let i = 0; data.length > i; i++) {
      addCategoryArray(data)
      if (!childrenCategory(data[i].childrenCategories)) {
        i++
      }
    }
  }

  const childrenCategory = (childrenArray: IChildrenCategory[]) => {
    if (childrenArray.find(x => x.childrenCategories) === undefined) {
      addCategoryArray(childrenArray)
      return false
    } else {
      for (let i = 0; childrenArray.length > i; i++) {
        if (childrenArray[i].childrenCategories.length > 0) {
          addCategoryArray(childrenArray[i].childrenCategories)
          childrenCategory(childrenArray[i].childrenCategories)
        } else {
          addCategoryArray(childrenArray)
        }
      }
    }
  }

  //Функция возврата только групп родительской группы

  const findCategory = () => {
    parentCategory()

    const checkCategoryFromArray = (checkId: number) => {
      return finaleCategory.find(e => e.id == checkId)
    }
    // Получение групп всех Дочерних групп (снизу --вверх  )
    const searchParen = (parentIdTwo: number) => {
      for (let i = 0; flatCategory.length > i; i++) {
        if (parentIdTwo == flatCategory[i].id) {
          if (checkCategoryFromArray(flatCategory[i].id) == undefined) {
            finaleCategory.push(flatCategory[i])
          }
        }
      }
    }
    // Получение групп всех Дочерних групп (сверху -  вниз )
    const childId = (parentId: number) => {
      for (let i = 0; flatCategory.length > i; i++) {
        if (parentId == flatCategory[i].parentCategoryId) {
          if (checkCategoryFromArray(flatCategory[i].id) == undefined) {
            finaleCategory.push(flatCategory[i])
            childId(flatCategory[i].id)
          }
        } else {
          for (let i = 0; finaleCategory.length > i; i++) {
            searchParen(finaleCategory[i].parentCategoryId)
          }
        }
      }
    }
    // Поиск группы из запроса с фронта
    const parentId = () => {
      flatCategory.map(x => {
        if (x.id == id) {
          finaleCategory.push(x)
          childId(x.id)
        }
      })
    }
    parentId()
  }

  findCategory()

  return finaleCategory
}

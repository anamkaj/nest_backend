export class GetParamCategory {
  count: number
  id: number
}

//Типы для массива который отправляется на фрона 

export class Category {
  id: number
  name: string
  parentCategoryId: number
  slug: string
  img: string
  description: string
  folderImg: string
}

// Типы для ответа от ДБ 

export class ICategory {
  id: number
  name: string
  parentCategoryId: number
  description: string | null
  img: string | null
  slug: string
  folderImg: string
  childrenCategories: IChildrenCategory[]
}

export class IChildrenCategory {
  id: number
  name: string
  parentCategoryId: number
  description: null | string
  img: null | string
  slug: string
  childrenCategories?: IChildrenCategory[]
  folderImg: string
}

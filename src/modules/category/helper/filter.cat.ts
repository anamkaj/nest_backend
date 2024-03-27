

//// Перебор массива категорий из дерева в плоский , старый способ v1

// import { Category, ICategory, IChildrenCategory } from '../dto/category.dto'

// const filterCategory: IChildrenCategory[][] = []
// export const flatArrayCategory: Category[] = []

// export const checkDouble = (id: number) => {
//   const res = flatArrayCategory.find(x => x.id == id)
//   return res
// }

// export const addStore = (data: ICategory[]) => {
//   const checkLength = (arr: IChildrenCategory[]) => {
//     if (arr.length !== 0) return true
//   }
//   // Создание плоского массива
//   filterCategory.push(data)
//   for (let i = 0; data.length > i; i++) {
//     if (checkLength(data[i].childrenCategories)) {
//       let ar = data[i].childrenCategories
//       for (let x = 0; ar.length > x; x++) {
//         if (checkLength(ar[x].childrenCategories)) {
//           let dr = ar[x].childrenCategories
//           for (let q = 0; dr.length > q; q++) {
//             let fb = dr[q].childrenCategories
            
//             filterCategory.push(ar, dr, fb)
//           }
//         } else {
//           // получение последней группы без дочерхних

//           filterCategory.push([
//             {
//               id: ar[x].id,
//               name: ar[x].name,
//               parentCategoryId: ar[x].parentCategoryId,
//               slug: ar[x].slug,
//               img: ar[x].img,
//               description: ar[x].description,
//               folderImg: ar[x].folderImg,
//             },
//           ])
//         }
//       }
//     }
//   }

//   // Перебор плоского массива на наличее дублей

//   for (let k = 0; filterCategory.length > k; k++) {
//     for (let n = 0; filterCategory[k].length > n; n++) {
//       if (!checkDouble(filterCategory[k][n].id)) {
//         flatArrayCategory.push({
//           id: filterCategory[k][n].id,
//           name: filterCategory[k][n].name,
//           parentCategoryId: filterCategory[k][n].parentCategoryId,
//           slug: filterCategory[k][n].slug,
//           img: filterCategory[k][n].img,
//           description: filterCategory[k][n].description,
//           folderImg: filterCategory[k][n].folderImg,
//         })
//       }
//     }
//   }
// }

// // ------------------------------------------

// // Функция поиска родителя (поиск вверх по группам )

// const sort = (arr: Category[]) => {
//   arr.map(x => {
//     if (!checkDouble(x.id)) {
//       flatArrayCategory.push({
//         id: x.id,
//         name: x.name,
//         parentCategoryId: x.parentCategoryId,
//         slug: x.slug,
//         img: x.img,
//         description: x.description,
//         folderImg: x.folderImg,
//       })
//     }
//   })
// }

// export const filterCat = (id: number) => {
//   const filterArrayCat = flatArrayCategory.filter(e => id == e.id)

//   const filterChild = (data: Category[]) => {
//     const childCat = data.map(t => {
//       if (t.parentCategoryId !== null) {
//         let a = t.parentCategoryId
//         const filterParent = flatArrayCategory.filter(g => a == g.id)
//         sort(filterParent)
//         filterChild(filterParent)
//       } else {
//         sort(filterArrayCat)
//       }
//     })
//     return childCat
//   }
//   filterChild(filterArrayCat)
//   return true
// }

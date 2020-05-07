import service from "../utils/request";
/**
 * 列表
 */


 /**
  * 新增
  */
 
  /**
   * 修改与编辑
   */
  export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}
/**
 * 删除
 */
/**
 * 删除分类
 */
export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}

 /**
  * 添加分类
  */
 /**
 * 一级分类添加
 */
 export function AddFristCategory(data){
   return service.request({
       method: "post",
       url: "/news/addFirstCategory/",
       data
   })
}

/**
 * 子级分类添加
 */
export function AddChildrenCategory(data){
   return service.request({
       method: "post",
       url: "/news/addChildrenCategory/",
       data
   })
}
/**
 * 获取分类
 */
export function GetCategory(data){
   return service.request({
       method: "post",
       url: "/news/getCategory/",
       data
   })
}

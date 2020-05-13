import service from "../utils/request";
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
 }
/**
 * 修改信息列表
 * @param {*} data 
 */
export function EditInfo(data){
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
 }
 /**
  * 新增
  */
 export function AddInfo(data){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
 }


 
  /**
   * 修改与编辑分类
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
export function DeleteInfo(data){
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}
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
       url: "/news/getCategoryAll/",
       data
   })
}

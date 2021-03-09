import {API} from '../../backend'


//category call
export const createCategory=(userId,token,category)=>{
        return fetch(`${API}/category/createcategory/${userId}`,{
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
        
        body:JSON.stringify(category)
        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>console.log(err))
};

//get all category

export const getAllCategory=()=>{
    return fetch(`${API}/category/allcategory`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


export const deleteCategory=(categoryId,userId,token)=>{

    return fetch(`${API}/category/deletecategory/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}

export const updateCategory=(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/updatecategory/${categoryId}/${userId}`,{
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
    
    body:JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
};






export const getACategory=categoryId=>{
    return fetch(`${API}/category/getcategory/${categoryId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}






//Product call

export const createProduct=(userId,token,product)=>{

    return fetch(`${API}/product/createproduct/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response=>{
        //console.log(response.json());
        return response.json(); 
    })
    .catch(err=>console.log(err))
}

//get all products

export const getAllProducts=()=>{
    return fetch(`${API}/product/getAllproduct`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


//get singl product

export const getAProducts=productId=>{
    return fetch(`${API}/product/getproduct/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//update product

export const updateProduct=(productId,userId,token,product)=>{

    return fetch(`${API}/product/updateproduct/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//delete product
export const deleteProduct=(productId,userId,token)=>{

    return fetch(`${API}/product/delproduct/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

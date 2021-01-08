import qs from "qs";
console.log(qs.stringify({query:"Pune",orderBy:"price"}))
export const API_END_POINT= 'https://developers.zomato.com/api/';
export const API_VERSION = 'v2.1';
export const USER_KEY = 'a62889927c3d3d819de9257935acd74d';

export const getCategories = () =>{
   return  fetch(`${API_END_POINT}${API_VERSION}/categories`,{
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      "user-key": USER_KEY
    },
  })
}


export const getCities = (query) =>{
 return  fetch(`${API_END_POINT}${API_VERSION}/cities?q=${query}&count=10`,{
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    "user-key": USER_KEY
  },
})
}


export const getLocations = (query) =>{
  return  fetch(`${API_END_POINT}${API_VERSION}/locations?query=${query}&count=10`,{
   method: 'GET', 
   headers: {
     'Content-Type': 'application/json',
     "user-key": USER_KEY
   },
 })
 }

export const getCollections = (id) =>{
 return  fetch(`${API_END_POINT}${API_VERSION}/collections?city_id=${id}&count=20`,{
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    "user-key": USER_KEY
  },
})
}

export const searchRestaurant = (params) =>{
  const searchCriteria = qs.stringify(params)
  return  fetch(`${API_END_POINT}${API_VERSION}/search?${searchCriteria}`,{
   method: 'GET', 
   headers: {
     'Content-Type': 'application/json',
     "user-key": USER_KEY
   },
 })
 }

 export const getLocationByLatLog = (params) =>{
  const searchCriteria = qs.stringify(params)
  console.log(searchCriteria);
  return  fetch(`${API_END_POINT}${API_VERSION}/geocode?${searchCriteria}`,{
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      "user-key": USER_KEY
    },
  })
 }





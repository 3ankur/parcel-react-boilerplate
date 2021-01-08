import React, { useEffect, useState, useCallback } from "react";
import { getCategories, getCities, getCollections, getLocations, searchRestaurant, getLocationByLatLog } from "../service";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { withRouter } from "react-router-dom";
import qs from "qs";
function HomePage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [collectionList, setCollection] = useState([]);
  const [location, setLocationDetail] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurant, setSelectedRestaurent]= useState([]);
  const [searchFoodTerm, setSearchFoodTerm] = useState('');

  // const loadCategories = async () => {

  //   try {
  //     const res = await getCategories();
  //     const data = await res.json();
  //     // const data = await responseData();
  //     console.log(data);
  //   } catch (e) {

  //   }

  // }

 


  const loadLocationDetails = () => {
    if (selectedCity.length) {
      const { name } = selectedCity[0];
      getLocations(name)
        .then((resp) => resp.json())
        .then(({location_suggestions}) => {
          setLocationDetail(location_suggestions[0] || {});
        });
    }

  }

  useEffect(() => {
    // loadCategories();
    loadLocationDetails()
  }, [selectedCity])

  useEffect(()=>{
    getLocation()
  },[])

  useEffect(()=>{
    getCollectiobList()
  },[location])


  

  const handleSearch = useCallback((query) => {

    try {
      getCities(query)
        .then((resp) => resp.json())
        .then(({ location_suggestions }) => {
          setOptions(location_suggestions);
          setIsLoading(false);
        });
    } catch (e) {
    }
    setIsLoading(true);
  });

// restaurant search handler .
const  handleRestaurantSearch = (searchTerms) =>{

  const params = {q:searchTerms,start:1,count:5}
  if(location){
    const {entity_id, entity_type} = location;
    params['entity_id'] = entity_id;
    params['entity_type'] = entity_type;
  }
  setSearchFoodTerm(searchTerms)
  searchRestaurant(params)
  .then((resp) => resp.json())
  .then(({ restaurants }) => {

    //let temp = [];
   let temp =  restaurants.map(({restaurant})=>{
      return ({
        name : restaurant.name,
        thumb: restaurant.thumb,
        rating: restaurant.user_rating.aggregate_rating || 1
      })
    })
    console.log(temp);
    setRestaurantList(temp);
    setIsLoading(false);
  });
}

  const getFoodSearch = () => {
   // console.log("sds", selectedCity);
    // getLocations

    console.log(props);

      const params = {q:searchFoodTerm}; 

      if(location){
        const {entity_id, entity_type} = location;
        params['entity_id'] = entity_id;
        params['entity_type'] = entity_type;
      }
       

    props.history.push(`/restaurant?${qs.stringify(params)}`);
    

  }

  const getCollectiobList = () =>{
  
    if(location  && location.city_id){
      const { city_id  } = location;
      getCollections(city_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCollection(data.collections || [])
      })
    }
     
   
  }

  const  getLocation =() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
}
  
  const  showPosition = (position) => {
    console.log(position);
    getLocationByLatLog({
      lat:position.coords.latitude ,
      lon:  position.coords.longitude
    })
    .then((resp) => resp.json())
    .then((resLoc) => {
      console.log(resLoc);
       setLocationDetail(resLoc.location || {});
       handleSearch(resLoc.location.city_name);
    });
  }


  return (
    <div>
      <div className="home_page_container">
        <div class="container">
          <h1 class="display-3 text-white">Enjoy Foods</h1>
          <div className="">
            <form class="form" onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="m-2 p-2">

                    {/* <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Location" />
                    
                */
                console.log("===>",selectedCity)
                }

                    <AsyncTypeahead
                      id="async-example"
                      isLoading={isLoading}
                      defaultSelected={selectedCity}
                      labelKey="name"
                      minLength={2}
                      onSearch={handleSearch}
                      onChange={setSelectedCity}
                      options={options}
                      placeholder="Search for a location..."
                      renderMenuItemChildren={(option, props) => {
                        // console.log(option);
                        return (
                          <div>
                            <img
                              alt={option.name}
                              src={option.country_flag_url}
                              style={{
                                height: '24px',
                                marginRight: '10px',
                                // width: '24px',
                              }}
                            />
                            <span>{option.name}</span>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="m-2 p-2">
                    {/* <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Food,resturent." /> */}
                    <AsyncTypeahead
                      id="food-resturent"
                      isLoading={isLoading}
                      labelKey="name"
                      minLength={1}
                      
                      onSearch={handleRestaurantSearch}
                      onChange={setSelectedRestaurent}
                      options={restaurantList}
                      placeholder="Search for a food resturent..."
                      renderMenuItemChildren={(option, props) => {
                      //  console.log(option);
                        return (
                          <div className="d-flex">
                            <img
                              alt={option.name}
                              src={option.thumb}
                              style={{
                                height: '44px',
                                marginRight: '10px',
                                // width: '24px',
                              }}
                            />
                           <div className="d-flex flex-column">
                           <span>{option.name}</span> 
                            <span className="text-bold">{option.rating}</span>
                           </div>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
                  <div className="m-2 p-2">
                    <button onClick={getFoodSearch} type="submit" class="btn btn-success w-100">Search</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: "30px" }}>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">

          {
            collectionList.map(({ collection }) => {
              // console.log(collection)
              return (<div key={collection.title} class="col mb-4" style={{ "width": "18rem" }}>
                <div class="card">
                  <img src={collection.image_url} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{collection.title}</h5>
                    <p class="card-text">{collection.description}</p>
                    <a target="_blank" href={collection.url} class="">view more</a>
                  </div>
                </div>
              </div>)
            })
          }

        </div>
      </div>
    </div>
  )
}
export default withRouter(HomePage);
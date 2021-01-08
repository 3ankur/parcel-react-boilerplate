import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import qs from "qs";
import { searchRestaurant } from "../../service";
import noImage from "../../assets/images/no-image-box.png";
function Restaurant({ location,history }) {

 const [restList, setRestList] = useState([]);
 const loadResturent = () => {

  let params = {};
  if (location.search.indexOf("?q")) {
   const newQs = location.search.replace("?q", "q")
   params = qs.parse(newQs);
  } else {
   params = qs.parse(location.search);
  }

  searchRestaurant(params)
   .then(res => res.json())
   .then((resData) => {
    console.log(resData);
    setRestList(resData.restaurants);
   })

 }

 useEffect(() => {
  console.log(qs.parse(location.search));
  loadResturent();
 }, [location.search])

const updateRoute = () =>{
 history.push(`/restaurant${location.search}&sort=cost`);
}
 

 const renderRating = (rate) => {
  let mainArr = [];
  let mainRate = Math.floor(rate.aggregate_rating);
  for (let i = 0; i < mainRate; i++) {
   mainArr.push(<span className="fa fa-star text-warning"></span>);
  }

  for (let j = mainArr.length; j < 5; j++) {
   mainArr.push(<span className="fa fa-star"></span>);
  }

  return (<div>
   {
    mainArr
   }
   <span className="ml-2">{rate.aggregate_rating}</span>
  </div>)
 }

 return (
  <div>
   <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a className="navbar-brand" href="/">Enjoy Food</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
    </button>

   </nav>
   <div className="container" style={{ marginTop: "8rem" }}>
    <div class="row">
     <div className="col-md-3">
      <div className="m-2 p-2">
       <div class="card">
        <div class="card-body">
         <div>
          <h6>Sort By</h6>
          <div onClick={updateRoute}>cost (low to high)</div>
          <div>cost (high to low)</div>
          <div>Popularity - high to low</div>
          <div>Rating - high to low</div>
         </div>

         <div>
          <h5>Category</h5>
          <div>Delivery</div>
          <div>Dine-out</div>
          <div>Cafés</div>
         </div>


         <div>
          <h5>Cuisine</h5>
          <div>Delivery</div>
          <div>Dine-out</div>
          <div>Cafés</div>
         </div>

         <div>
          <h5> Establishment Type</h5>
          <div>Delivery</div>
          <div>Dine-out</div>
          <div>Cafés</div>
         </div>

        </div>
       </div>
      </div>


     </div>
     <div class="col-sm-9">
      {
       restList.map(({ restaurant }, idx) => {

        return (
         <div className="m-2 p-2" key={`${idx}-${restaurant.R.res_id}`}>

          <div class="card">
           <div class="card-body">

            <div className="row">
             <div className="col-4">
              <div className="res_section" >
               {
                //style={{ backgroundImage: restaurant.thumb ? `url(${restaurant.thumb})` : `url(${noImage})`, backgroundRepeat: 'no-repeat' }}

               }
             
               <img src={restaurant.thumb} className="rounded img-fluid"/>
              </div>
             </div>
             <div className="col-8">

              <h5 class="card-title p-0 m-0">{restaurant.name}</h5>
              {renderRating(restaurant.user_rating)}
              <div className="w-100">
               <p>{restaurant.location.locality}</p>
               <p className="text-gray">{restaurant.location.address}</p>
              </div>
             </div>
            </div>



            <hr />
            <div className="row small_font_sz">
             <div className="col-sm-3 col-md-2 col-5">
              <label className="res_other_font">CUISINES:</label>
             </div>
             <div className="col-md-8 col-6 font-weight-light">{restaurant.cuisines}</div>
            </div>

            <div className="row small_font_sz">
             <div className="col-sm-3 col-md-2 col-5">
              <label className="res_other_font">HOURS:</label>
             </div>
             <div className="col-md-8 col-6 font-weight-light">{restaurant.timings}</div>
            </div>

            <div className="row small_font_sz">
             <div className="col-sm-3 col-md-2 col-5">
              <label className="res_other_font">COST FOR TWO:</label>
             </div>
             <div className="col-md-8 col-6 font-weight-light">{restaurant.currency} {restaurant.average_cost_for_two}</div>
            </div>

            <div className="row small_font_sz">
             <div className="col-sm-3 col-md-2 col-5">
              <label className="res_other_font">CONTACTS:</label>
             </div>
             <div className="col-md-8 col-6 font-weight-light">{restaurant.phone_numbers}</div>
            </div>

            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
           </div>
          </div>
         </div>
        )

       })
      }

     </div>
     {/* <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div> */}
    </div>
   </div>
  </div>
 )
}

export default withRouter(Restaurant);
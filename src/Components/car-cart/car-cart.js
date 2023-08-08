import "./car-cart.css";
import { useEffect, useState,useContext } from "react";
import {saveAddContext} from '../../Contexts/saveAdd'
import strings from "../../localization/localization";
import { useNavigate } from 'react-router-dom';
function CarCart(props) {
  const { car } = props;
  const {saveAdd,setSaveAdd } = useContext(saveAddContext);
  const[addId,setaddId]=useState([])
  const navigate = useNavigate()
 
  const goToDetails=(item)=>{
      navigate("/details", {state:item}
        
        )
   }
  
  useEffect(()=>{
    setaddId(saveAdd?saveAdd.map((f)=>f.id):[])
    localStorage.setItem("saveAdd", JSON.stringify(saveAdd));
    //console.log(saveAdd);
  },[saveAdd])

  function addAdd (obj) {
    setSaveAdd(([ ...saveAdd, obj]))
    
 
   }

   const deleteAdd =(id)=>{
    const list = saveAdd.filter(f => f.id !== id)
    setSaveAdd(list)
   }

   function hanedlAddDelete(item){ 
     var x = addId.includes(item.id)
     if(x){
       deleteAdd(item.id)
     }else{
       addAdd(item)
     }
   }
  return (
    <>
      <div className=" mb-3 border-0 rounded cont mx-1">
        <div className="row g-0 scale">
          <div className="col-lg-2">
            <img
              width="100%"
              src={car.imgUrl}
              className="img-fluid rounded imge"
              alt="..."
              style={{ objectFit: "cover", height: "270px" }}
            />
          </div>

          <div className="col-lg-10 p-3 ">
            <div className="card-body ">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-2 ">
                  <img className="w-75 mb-1 " src={car.logoUrl} alt="" />
                </div>
                <p className="col-6" style={{ textAlign: "end" }}>
                  قبل يوم
                </p>
              </div>
              <h5 className="card-title pointer" onClick={()=>{goToDetails(car)}}>{car.name}</h5>
              <div className="row p-3" style={{ textAlign: "start" }}>
                {car.kilometersDone && (
                  <div className="col">
                    <i className="fa-solid fa-gauge-high text-primary"></i>
                    <span style={{ margin: "8px" }}>
                      {strings.kilometerage}
                    </span>

                    <h6>{car.kilometersDone}{strings.km}</h6>
                  </div>
                )}
                {car.manufactureDate && (
                  <div className="col">
                    <i className="fa-regular fa-calendar-days text-primary"></i>
                    <span style={{ margin: "8px" }}>
                      {strings.productionYear}
                    </span>
                    <h6>{car.manufactureDate}</h6>
                  </div>
                )}
                {car.saleLocation && (
                  <div className="col">
                    <i className="fa-sharp fa-solid fa-location-dot text-primary"></i>
                    <span style={{ margin: "8px" }}>{strings.location}</span>

                    <h6>{car.saleLocation}</h6>
                  </div>
                )}
                {car.description && <p className="textOverFlow mt-1"> {car.description}</p>}
              </div>
              <div className="d-flex justify-content-between ">
                {car.price&&(<>
                <h6
                  className=" px-5 py-1"
                  style={{
                    textAlign: "center",
                    color: "blue",
                    background: "rgb(206, 224, 248)",
                  }}
                >
                  {car.price}
                </h6>
                
                </>)
                }
                

                <div className="d-flex">
            <span className="mx-3 pointer" onClick={()=>{hanedlAddDelete(car)}}>
              
                <i className={`fa-regular fa-heart p-1 ${addId.includes(car.id)?"text-danger":""}`} ></i>
              
               {addId.includes(car.id)?strings.removeAd:strings.saveAd}
            </span>
            
            </div>
              </div>
              
            </div>
          </div>
          {/* <div className="test "></div> */}
        </div>
      </div>
    </>
  );
}
export default CarCart;

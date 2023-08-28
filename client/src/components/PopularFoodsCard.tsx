import { Link } from "react-router-dom";
import './Cards.css';
import Image1 from "../assets/1food.jpg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPopularFood } from "../slices/popularSlice";
import { useEffect } from "react";
const PopularFoodsCard = () => {

  const dispatch = useAppDispatch();

  const {popularFood, isLoading} = useAppSelector((state) => state.popularFood)

  console.log(isLoading, popularFood)
  useEffect(() => {
      dispatch(getPopularFood())
  }, [dispatch])


  const titleStyle = {
    backgroundImage: `url(${Image1})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    width: '100%',
    height: '420px'
  };

  //const Image2 = popularFood.map((item) => item.food_image)
  // const VendorName = popularFood.map((item) => item.name)
  // const description = popularFood.map((item) => item.description)
    return (
      <div>
        <div className="title-popularfoods" style={titleStyle}>
        <h1 className='popular-foods' >Popular Foods</h1>
      </div>
      <div className="wrapper">
      {popularFood?.map((item, index) => (
      
            <div className="card-container" key={index}>
                <div className="image-container">
                    <img src={item.food_image} alt="" />
                </div>
                <div className="card-content">
                    <div className="card-title">
                        <h3 style={{ fontSize: '1.5rem', color: 'green', fontWeight: 'bold' }}>{item.name}</h3>
                    </div>
                    <div className="card-body">
                        <p>{item.description}</p>
                    </div>
                    <div className="btn"></div>

                    <Link to="/allvendorfoods">
                        <button onClick={()=>localStorage.setItem('vendorid', item.vendorId)}>
                            <a className="view">view more</a>
                        </button>
                    </Link>
                </div>
            </div>))}
            </div>
    </div>
  )
}

export default PopularFoodsCard;

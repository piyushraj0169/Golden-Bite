import Banner from "../components/Banner"
import OurFeature from "../components/OurFeature"
import OurServices from "../components/OurServices"



function Services(){
    const header_text="Services"
    return(
        <div>
            <Banner header_text={header_text}/>
            <OurFeature/>
            <OurServices/>
        </div>
    )
}
export default Services


















// import Banner from "../components/Banner";
// import OurFeature from "../components/OurFeature";
// import OurService from "../components/OurService";

// import ProductList from "../components/ProductList";



// function Services(){

//     const header_text="Services"
//     return (
//         <div >
            
            
//             <Banner header_text={header_text}/>
//             <OurFeature/>
//             <OurService />
           


//         </div>
//     );  

// }
// export default Services;
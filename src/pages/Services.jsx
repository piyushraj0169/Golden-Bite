import Banner from "../components/Banner"
import OurFeature from "../components/OurFeature"
import OurServices from "../components/OurServices"
import HoneyComb from "../components/HoneyComb"



function Services(){
    const header_text=" Bakery Services"
    const header_line="From Our Oven to Your Heart"
    return(
        <div>
            <Banner header_text={header_text} header_line={header_line}/>
            <OurFeature/>
            <OurServices/>
            <HoneyComb/>
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
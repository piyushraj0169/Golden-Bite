Products.jsx
import Banner from "../components/Banner"
import OurCategories from "../components/OurCategories"

function Products(){
    const header_text="Products"
    return(
        <div>
            <Banner header_text={header_text}/>
            <OurCategories/>
        </div>
    )
}
export default Products















// import Banner from "../components/Banner"

// function Products(){
//     const header_text="Contact Us"
//     return(
//         <div>
//             <Banner header_text={header_text}/>
//         </div>
//     )
// }
// export default Products
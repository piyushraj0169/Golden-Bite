Products.jsx
import Banner from "../components/Banner"
import OurCategories from "../components/OurCategories"
import ProductList from "../components/ProductList"

function Products(){
    const header_text="Products"
    const header_line="Freshly Baked Goodness, Just for You"
    return(
       
         

        <div >
           
            <Banner header_text={header_text} header_line={header_line}/>
           
            <ProductList />
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
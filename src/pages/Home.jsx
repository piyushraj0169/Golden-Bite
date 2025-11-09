import Banner from "../components/Banner"
import CallUs from "../components/CallUs"
import OurFeature from "../components/OurFeature"
import ProductList from "../components/ProductList"

function Home(){
    const header_text="We Bake With Passion"
    return(
        <div>
            <Banner header_text={header_text}/>
            <OurFeature/>
            <CallUs/>
            <ProductList/>
            
        </div>
    )
}
export default Home
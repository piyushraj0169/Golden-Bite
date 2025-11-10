import Banner from "../components/Banner"
import CallUs from "../components/CallUs"
import HoneyComb from "../components/HoneyComb"
import OurFeature from "../components/OurFeature"
import ProductList from "../components/ProductList"


function Home(){
    const header_text="We Bake With Passion"
    const header_line=" A bakery is where dreams rise and delicious memories are made "
    return(
        <div>
            <Banner header_text={header_text} header_line={header_line}/>
            <OurFeature/>
            <CallUs/>
            <HoneyComb/>
            
        </div>
    )
}
export default Home
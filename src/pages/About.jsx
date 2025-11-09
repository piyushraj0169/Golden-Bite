import AboutUs from "../components/AboutUs"
import Banner from "../components/Banner"
import OurTeam from "../components/OurTeam"

function About(){
   const header_text="About Us"
    return(
        <div>
            <Banner header_text={header_text}/>
            <AboutUs/>
            <OurTeam/>
        </div>
    )
}
export default About
















// import AboutUs from "../components/AboutUs"
// import Banner from "../components/Banner"
// import OurTeam from "../components/OurTeam"

// function About(){
//     return(
//         <div>
//             <Banner/>
//             <AboutUs/>
//             <OurTeam/>
//         </div>
//     )
// }
// export default About
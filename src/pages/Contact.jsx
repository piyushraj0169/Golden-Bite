import Banner from "../components/Banner"
import ContactForm from "../components/ContactForm"

function Contact(){
    const header_text="Contact Us"
    return(
        <div>
            <Banner header_text={header_text}/>
            <ContactForm/>
        </div>
    )
}
export default Contact


















// import Banner from '../components/Banner'
// import ContactForm from '../components/ContactForm'


// function Contact(){
//     const header_text="Contact Us"
//     return (
//         <div>
//             <Banner header_text={header_text}/>
//             <ContactForm/>
//         </div>
//     );  

// }
// export default Contact;
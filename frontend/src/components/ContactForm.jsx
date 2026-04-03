import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

function ContactForm() {
    return (
        <div className="contact-section py-5">
            <div className="container my-5">
                <div className="text-center mb-5 feature-section-header">
                    <span className="feature-subtitle-badge mb-3 d-inline-block">Get In Touch</span>
                    <h2 className="feature-main-header text-white">Need Assistance? <span className="text-gold">Contact Us</span></h2>
                    <p className="text-light mt-3 max-w-600 mx-auto">
                        If you’re facing any issue or simply want to know more about our services, fill out the form below. 
                        Our team will get back to you shortly.
                    </p>
                </div>

                <div className="row g-5 align-items-stretch">
                    {/* Left Column: Form */}
                    <div className="col-lg-7">
                        <div className="contact-form-card p-4 p-md-5 rounded shadow-lg h-100">
                            <form className="modern-form">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="form-group custom-input-group">
                                            <label className="text-gold small fw-bold mb-2">FULL NAME</label>
                                            <input type="text" placeholder="John Doe" className="form-control premium-input"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group custom-input-group">
                                            <label className="text-gold small fw-bold mb-2">EMAIL ADDRESS</label>
                                            <input type="email" placeholder="john@example.com" className="form-control premium-input" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group custom-input-group">
                                            <label className="text-gold small fw-bold mb-2">SUBJECT</label>
                                            <input type="text" placeholder="How can we help?" className="form-control premium-input" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group custom-input-group">
                                            <label className="text-gold small fw-bold mb-2">YOUR MESSAGE</label>
                                            <textarea rows="5" className="form-control premium-input" placeholder="Tell us more about your inquiry..."></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 pt-3">
                                        <button className="btn btn-gold-solid w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" type="submit">
                                            <FaPaperPlane /> SEND MESSAGE
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="col-lg-5">
                        <div className="contact-info-wrapper h-100 d-flex flex-column gap-4">
                            <div className="contact-info-card p-4 rounded shadow-lg flex-grow-1">
                                <div className="d-flex align-items-start gap-4">
                                    <div className="info-icon-box">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h5 className="text-white fw-bold mb-2">Visit Our Bakery</h5>
                                        <p className="text-light mb-0">123 Street Sector 17, Mohali,<br/>Punjab, India - 140603</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-info-card p-4 rounded shadow-lg flex-grow-1">
                                <div className="d-flex align-items-start gap-4">
                                    <div className="info-icon-box">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <h5 className="text-white fw-bold mb-2">Call Us Anytime</h5>
                                        <p className="text-light mb-1">+91 23301 69000</p>
                                        <p className="text-light mb-0">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-info-card p-4 rounded shadow-lg flex-grow-1">
                                <div className="d-flex align-items-start gap-4">
                                    <div className="info-icon-box">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h5 className="text-white fw-bold mb-2">Email Support</h5>
                                        <p className="text-light mb-1">support@goldenbite.in</p>
                                        <p className="text-light mb-0">goldenbite@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;






























// function ContactForm(){
//     return(
//         <div className="container at-5">
//             <h3 className="text-center">If you have any query<br></br>Please contact us</h3>
//             <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores sed illo, nostrum maxime laborum expedita, tempore praesentium eaque aut exercitationem nihil possimus accusamus, ad vero necessitatibus ea voluptatem eum numquam?
//             Voluptate sequi tempora, voluptatum ab alias consequatur doloribus earum laboriosam, dicta nostrum recusandae veniam illum doloremque totam modi corporis, ipsum dolorum sint aspernatur harum deserunt. Enim accusamus facere mollitia inventore.</p>
//             <div>
//                 <form>
//                     <div className="row">
//                         <div className="col-lg-6">
//                             <input type="text" placeholder="Your Name" className="form-control" />

//                         </div>
//                     </div>
//                         <div className="col-lg-6">
//                             <div className="my-3">
//                             <input type="email" placeholder="Your Email" className="form-control" />
//                         </div>

//                         </div>

//                         <div className="my-3">
//                             <input type="textarea" placeholder="subject" className="form-control" />
//                         </div>

//                         <div className="my-3">
//                             <textarea rows="5" className="form-control" placeholder="message"></textarea>

//                         </div>

//                         <div className="my-3">
//                             <div className="d-grid gap-2 col-2 mx-auto">
//                             <button className="btn btn-dark" type="submit">Submit</button>

//                             </div>

//                         </div>

                    
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default ContactForm;
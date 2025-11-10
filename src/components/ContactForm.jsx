function ContactForm(){
    return(
        <div className="container mt-5">
            <h3 className="text-center">Need Assistance? Contact Our Support Team</h3>
            <p className="text-center">If you’re facing any issue or simply want to know more about our services, fill out the form below. Our team will get back to you shortly.</p>
            <div>
                <form>
                    <div className="row">
                        <div className="col-lg-6"><div className="my-3">
                            <input type="text" placeholder="Your Name" className="form-control"/>
                        </div>
                    </div>
                        <div className="col-lg-6">
                            <div className="my-3">
                                <input type="email" placeholder="Your Email" className="form-control" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="my-3">
                        <input type="text" placeholder="Subject" className="form-control" />
                    </div>

                    <div className="my-3">
                        <textarea rows="5" className="form-control" placeholder="Message"></textarea>
                    </div>

                    <div className="my-3">
                        <div class="d-grid gap-2 col-2 mx-auto">
                            <button class="btn btn-dark" type="submit">Send Message</button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ContactForm






























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
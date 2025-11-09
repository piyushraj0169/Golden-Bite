import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"

function OurTeam() {
    const { our_team } = useContext(StoreContext)

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-5">
                We're Super Professional At Our Skills
            </h3>

            <div className="row gy-4">
                {
                    our_team.map((team) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-12 text-center" key={team._id}>
                                <img 
                                    src={team.image} 
                                    
                                    alt="" 
                                    className="team-img"
                                />
                                <p className="text-center mt-3 bg-danger border-radius-5 " key={team.name}>
                                    {team.name}
                                </p>
                            </div>

                            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OurTeam

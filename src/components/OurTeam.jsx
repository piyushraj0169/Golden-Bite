import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaUserTie } from "react-icons/fa";


function OurTeam() {
  const { our_team } = useContext(StoreContext);

  return (
    <div className="container my-5 py-4 team-section">
      <h2 className="text-center mb-5 fw-bold">
        We're Super Professional At Our Skills
      </h2>

      <div className="row gy-5 justify-content-center">
        {our_team.map((team) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={team._id}>
            <div className="team-card text-center">
              <img src={team.image} alt={team.name} className="team-img" />

              <h5 className="team-name">{team.name}</h5>

              <p className="team-role">
                <FaUserTie className="me-2" />
                {team.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;

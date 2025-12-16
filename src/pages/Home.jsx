
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "40px", textAlign: "centrer" }}>
      <h1> Unlock your potential with the best language tutors</h1>
      <p>Embark on an exciting language journey with expert tutors.</p>

      {/* Avantajlar Listesi (Şartnamedeki avantajlar) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          margin: "40px 0",
        }}
      >
        <div>
          <strong>32,000+</strong> <br /> Experienced tutors
        </div>
        <div>
          <strong>300,000+</strong> <br /> 5-star reviews
        </div>
        <div>
          <strong>120+</strong> <br /> Subjects taught
        </div>
        <div>
          <strong>200+</strong> <br /> Native speakers
        </div>
      </div>
      <button
        onClick={() => navigate("/teachers")}
        style={{
          padding: "15px 30px",
          backgroundColor: "#FBE134",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;

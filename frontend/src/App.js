import { useEffect, useState } from "react";
import axios from "axios";
import { Scatter, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [wcss, setWcss] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [view, setView] = useState("dashboard");
  const [k, setK] = useState(5);

  // 🔹 LOAD ANALYSIS DATA
  useEffect(() => {
    axios.get("https://customer-segmentation-dashboard-4uoh.onrender.com/analysis")
      .then(res => {
        console.log("ANALYSIS:", res.data);
        setData(res.data.data);
        setSummary(res.data.summary);
        setWcss(res.data.wcss);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔹 LOAD CLUSTERS
  useEffect(() => {
    axios.get(`https://customer-segmentation-dashboard-4uoh.onrender.com/clusters/${k}`)
      .then(res => {
        console.log("CLUSTERS:", res.data);
        setClusters(res.data);
      })
      .catch(err => console.error(err));
  }, [k]);

  const colors = ["#ff4d4d","#4da6ff","#33cc33","#ffcc00","#cc66ff","#ff9933"];

  // 📊 Graphs
  const incomeSpending = {
    datasets: [{
      label: "Income vs Spending",
      data: data.map(d => ({
        x: d["Annual Income (k$)"],
        y: d["Spending Score (1-100)"]
      })),
      backgroundColor: "#4da6ff",
      borderColor: "#4da6ff"
    }]
  };

  const ageSpending = {
    datasets: [{
      label: "Age vs Spending",
      data: data.map(d => ({
        x: d.Age,
        y: d["Spending Score (1-100)"]
      })),
      backgroundColor: "#ff9933",
      borderColor: "#ff9933"
    }]
  };

  const genderData = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Male",
      data: [
        data.filter(d => d.Gender === "Male").length,
        0
      ],
      backgroundColor: "#4da6ff",
      borderColor: "#4da6ff"
    },
    {
      label: "Female",
      data: [
        0,
        data.filter(d => d.Gender === "Female").length
      ],
      backgroundColor: "#ff66cc",
      borderColor: "#ff66cc"
    }
  ]
}; 

  const elbowChart = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [{
      label: "WCSS",
      data: wcss,
      borderColor: "#316bad",
backgroundColor: "#f00b0b",
fill: false,
tension: 0.3
    }]
  };

  const clusterChart = {
    datasets: Array.from({ length: k }, (_, i) => ({
      label: `Cluster ${i}`,
      data: clusters
        .filter(d =>d.Cluster == i)
        .map(d => ({
          x: Number(d["Annual Income (k$)"]),
          y: Number(d["Spending Score (1-100)"])
        })),
      backgroundColor: colors[i % colors.length]
    }))
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CustomerScope</h1>

      {/* NAV */}
      <div style={styles.nav}>
        {["dashboard","table","graphs","cluster"].map(v => (
          <button key={v} onClick={()=>setView(v)} style={styles.btn(view===v)}>
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {view==="dashboard" && (
        <div style={styles.grid}>
          <Card title="Total Customers" value={data.length} />
          <Card title="Avg Income" value={Math.round(summary["Annual Income (k$)"]?.mean || 0)} />
          <Card title="Avg Spending" value={Math.round(summary["Spending Score (1-100)"]?.mean || 0)} />
        </div>
      )}

      {/* TABLE */}
      {view==="table" && (
        <div style={styles.card}>
          <h2>Customer Data</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th><th>Gender</th><th>Age</th>
                <th>Income</th><th>Spending</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d,i)=>(
                <tr key={i}>
                  <td>{d.CustomerID}</td>
                  <td>{d.Gender}</td>
                  <td>{d.Age}</td>
                  <td>{d["Annual Income (k$)"]}</td>
                  <td>{d["Spending Score (1-100)"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* GRAPHS */}
      {view==="graphs" && (
        <div style={styles.grid}>
          <ChartCard title="Income vs Spending">
            <Scatter data={incomeSpending} options={chartOptions}/>
          </ChartCard>

          <ChartCard title="Age vs Spending">
            <Scatter data={ageSpending} options={chartOptions}/>
          </ChartCard>

          <ChartCard title="Gender Distribution">
            <Bar data={genderData}/>
          </ChartCard>

          <ChartCard title="Elbow Method">
            <Line data={elbowChart}/>
          </ChartCard>
        </div>
      )}

      {/* CLUSTER */}
      {view==="cluster" && (
        <div style={styles.card}>
          <h2>Cluster Visualization</h2>

          <select value={k} onChange={(e)=>setK(Number(e.target.value))}>
            {[2,3,4,5,6,7].map(n=><option key={n}>{n}</option>)}
          </select>

          <div style={{height:"500px"}}>
            <Scatter key={k} data={clusterChart} options={chartOptions}/>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 Components
const Card = ({title,value}) => (
  <div style={styles.cardSmall}>
    <h3>{title}</h3>
    <p style={{fontSize:"24px"}}>{value}</p>
  </div>
);

const ChartCard = ({title,children}) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <div style={{height:"300px"}}>{children}</div>
  </div>
);

// 🔹 Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "white",   // ✅ text visible
        boxWidth: 20
      }
    }
  }
};

// 🎨 Styles
const styles = {
  container:{background:"#0f172a",color:"white",minHeight:"100vh",padding:"20px"},
  title:{textAlign:"center"},
  nav:{display:"flex",justifyContent:"center",gap:"10px",margin:"20px"},
  btn:(active)=>({
    padding:"10px",
    background:active?"#3b82f6":"#1e293b",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }),
  grid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit, minmax(500px, 1fr))",
  gap:"25px"
},
 card:{
  background:"#1e293b",
  padding:"25px",
  borderRadius:"12px",
  boxShadow:"0 4px 20px rgba(0,0,0,0.3)"
},
  cardSmall:{background:"#1e293b",padding:"20px",borderRadius:"10px",textAlign:"center"},
  table:{width:"100%",textAlign:"center",borderCollapse:"collapse"}
};

export default App;
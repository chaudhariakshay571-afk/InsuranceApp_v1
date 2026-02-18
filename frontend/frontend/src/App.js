// import React, { useState } from "react";
// import axios from "axios";

// const API = "http://localhost:8000";

// function App() {
//   const [page, setPage] = useState("login");
//   const [token, setToken] = useState("");

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Insurance App</h2>

//       {!token && (
//         <>
//           <button onClick={() => setPage("login")}>Login</button>
//           <button onClick={() => setPage("register")}>Register</button>
//         </>
//       )}

//       {page === "register" && <Register setPage={setPage} />}
//       {page === "login" && <Login setToken={setToken} />}
//       {token && <Dashboard token={token} />}
//     </div>
//   );
// }

// /* ---------------- REGISTER ---------------- */

// function Register({ setPage }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  

//   const submit = async () => {
//     await axios.post(`${API}/register`, {
//       name,
//       email,
//       password,
//     });
//     alert("Registered");
//     setPage("login");
//   };

//   return (
//     <div>
//       <h3>Register</h3>
//       <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
//       <button onClick={submit}>Submit</button>
//     </div>
//   );
// }

// /* ---------------- LOGIN ---------------- */



// function Login({ setToken }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");   // optional but useful

//   const submit = async () => {   // <-- YE YAHAN ADD KARNA
//     try {
//       const res = await axios.post(`${API}/login`, {
//         email,
//         password,
//       });

//       setToken(res.data.token);
//       setError("");
//     } catch (e) {
//       setError("Wrong Email or Password");
//     }
//   };

//   return (
//     <div>
//       <h3>Login</h3>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <input
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />

//       <button onClick={submit}>Login</button>
//     </div>
//   );
// }


// /* ---------------- DASHBOARD ---------------- */

// function Dashboard({ token }) {
//   const [, setDob] = useState("");
//   const [age, setAge] = useState(0);
//   const [premium, setPremium] = useState(10000);
//   const [sumAssured, setSumAssured] = useState(0);
//   const [frequency, setFrequency] = useState("Yearly");
//   const [policyType, setPolicyType] = useState("Term Life Insurance");
//   const [paymentOption, setPaymentOption] = useState("Gpay");
//   const [riders, setRiders] = useState(1);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [table, setTable] = useState([]);   
  

//   const calcAge = (value) => {
//     const birth = new Date(value);
//     const today = new Date();
//     let a = today.getFullYear() - birth.getFullYear();
//     setAge(a);
//   };

//   const calcSumAssured = () => {
//     const sa = Math.max(premium * 10, 5000000);
//     setSumAssured(sa);
//   };

//   const validate = () => {
//     if (age < 23 || age > 56) {
//       setError("Age must be 23 - 56");
//       return false;
//     }
//     if (premium < 10000 || premium > 50000) {
//       setError("Premium must be 10000 - 50000");
//       return false;
//     }
//     if (sumAssured === 0) {
//       setError("Click Calculate Sum Assured first");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   /* -------- SAVE INPUT -------- */
//   const submit = async () => {
//     if (!validate()) return;

//     await axios.post(`${API}/input`, {
//       ppt: 6,
//       pt: 15,
//       premium: Number(premium),
//       age,
//       frequency,
//       token,
//     });

//     alert("Saved");
//   };

//   /* -------- FINAL OUTPUT TABLE LOGIC (FRONTEND) -------- */
//   const calculateFinal = () => {
//     if (!validate()) return;

//     let ppt = 6;
//     let pt = 15;
//     let bonusRate = 2.5;
//     let bonusSum = 0;
//     let rows = [];

//     for (let year = 1; year <= pt; year++) {
//       let premiumVal = year <= ppt ? premium : 0;
//       let saVal = year === pt ? sumAssured : 0;

//       let bonusAmount = (bonusRate / 100) * sumAssured;
//       bonusSum += bonusAmount;

//       let totalBenefit = year === pt ? sumAssured + bonusSum : 0;
//       let netCash =
//         year === pt ? totalBenefit : sumAssured - premiumVal;

//       rows.push({
//         policy_year: year,
//         premium: premiumVal,
//         sum_assured: saVal,
//         bonus_rate: bonusRate.toFixed(2) + "%",
//         bonus_amount: bonusAmount.toFixed(0),
//         total_benefit: totalBenefit.toFixed(0),
//         net_cashflow: netCash.toFixed(0),
//       });

//       bonusRate += 0.5;
//     }

//     setTable(rows);
//   };

//   return (
//     <div>
//       <h3>Insurance Form</h3>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <label>DOB</label><br/>
//       <input type="date"
//         onChange={(e) => {
//           setDob(e.target.value);
//           calcAge(e.target.value);
//         }}
//       />
//       <p>Age: {age}</p>

//       <label>Premium</label><br/>
//       <input
//         type="number"
//         value={premium}
//         onChange={(e) => setPremium(e.target.value)}
//       />

//       <br/><br/>
//       <label>Premium Frequency</label><br/>
//       <select onChange={(e) => setFrequency(e.target.value)}>
//         <option>Yearly</option>
//         <option>Half-Yearly</option>
//         <option>Monthly</option>
//       </select>

//       <br/><br/>
//       <button onClick={calcSumAssured}>Calculate Sum Assured</button>
//       <p>Sum Assured: {sumAssured}</p>

//       <button onClick={submit}>Submit</button>
//       <button onClick={calculateFinal} style={{marginLeft:10}}>
//         Final Output
//       </button>

//       {/* -------- FINAL TABLE -------- */}
//       {table.length > 0 && (
//         <table border="1" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Policy Year</th>
//               <th>Premium</th>
//               <th>Sum Assured</th>
//               <th>Bonus Rate</th>
//               <th>Bonus Amount</th>
//               <th>Total Benefit</th>
//               <th>Net Cashflow</th>
//             </tr>
//           </thead>
//           <tbody>
//             {table.map((row, i) => (
//               <tr key={i}>
//                 <td>{row.policy_year}</td>
//                 <td>{row.premium}</td>
//                 <td>{row.sum_assured}</td>
//                 <td>{row.bonus_rate}</td>
//                 <td>{row.bonus_amount}</td>
//                 <td>{row.total_benefit}</td>
//                 <td>{row.net_cashflow}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//export default App;
import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Insurance App</h2>

      {!token && (
        <>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </>
      )}

      {page === "register" && <Register setPage={setPage} />}
      {page === "login" && <Login setToken={setToken} />}
      {token && <Dashboard token={token} />}
    </div>
  );
}

/* ---------------- REGISTER ---------------- */

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await axios.post(`${API}/register`, { name, email, password });
    alert("Registered");
    setPage("login");
  };

  return (
    <div>
      <h3>Register</h3>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

/* ---------------- LOGIN ---------------- */

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      setToken(res.data.token);
      setError("");
    } catch {
      setError("Wrong Email or Password");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={submit}>Login</button>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function Dashboard({ token }) {
  

  const [, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [premium, setPremium] = useState(50000);   // default premium
  const [sumAssured, setSumAssured] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [riders, setRiders] = useState("");   // dropdown so string
  const [pt, setPt] = useState("");
  const [ppt, setPpt] = useState("");
  
  const [error, setError] = useState("");
  const [table, setTable] = useState([]);


  /* -------- AGE -------- */
  const calcAge = (value) => {
    const birth = new Date(value);
    const today = new Date();
    let a = today.getFullYear() - birth.getFullYear();

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      a--;
    }
    setAge(a);
  };

  /* -------- SUM ASSURED -------- */
  const calcSumAssured = () => {
    const sa = premium * 10;
    setSumAssured(sa);
  };
  /* -------- VALIDATION -------- */
  const validate = () => {
    if (age < 23 || age > 56) {
      setError("Age must be 23 - 56");
      return false;
    }
    if (premium < 10000 || premium > 50000) {
      setError("Premium must be 10000 - 50000");
      return false;
    }
    if (!pt || !ppt) {
      setError("Enter PT and PPT");
      return false;
    }

    if (Number(pt) < 10 || Number(pt) > 20) {
      setError("Policy Term must be 10 - 20");
      return false;
    }
    if (Number(ppt) < 5 || Number(ppt) > 10) {
      setError("Premium Paying Term must be 5 - 10");
      return false;
    }
    if (Number(ppt) > Number(pt)) {
      setError("Premium Paying Term must be 5 - 10 AND PolicyTerm must be 10 - 20 Only");
      return false;
    }

    if (sumAssured === 0) {
      setError("Click Calculate Sum Assured first");
      return false;
    }
    if (!policyType || !paymentOption || !riders || !frequency) {
      setError("Select all dropdowns");
      return false;
    }
    
    setError("");
    return true;
  };

  /* -------- SAVE INPUT -------- */
  const submit = async () => {
    if (!validate()) return;

    await axios.post(`${API}/input`, {
      ppt: Number(ppt),
      pt: Number(pt),
      premium: Number(premium),
      age: Number(age),
      frequency: frequency,
      sum_assured: Number(sumAssured),
      policy_type: policyType,
      payment_option: paymentOption,
      riders: Number(riders),
      token: token        
    });

    alert("Data Stored Successfully");
  };

  /* -------- FINAL TABLE -------- */
  const calculateFinal = async () => {
    if (!validate()) return;

    // let ppt = 6;
    // let pt = 15;
    
    let bonusRate = 0.25;
    let bonusSum = 0;
    let rows = [];

    for (let year = 1; year <= Number(pt); year++) {
      let premiumVal = year <= Number(ppt) ? premium : 0;
      let saVal = year === Number(pt) ? sumAssured : 0;

      let bonusAmount = (bonusRate/100) * sumAssured;
      bonusSum += bonusAmount;

      let totalBenefit = year === Number(pt) ? sumAssured + bonusSum : 0;
      
      let netCash;
      if (year <= Number(ppt)) {
          netCash = -premiumVal;
      } else if (year === Number(pt)) {
          netCash = totalBenefit;
      } else {
          netCash = 0;
      }
      
      
      
          rows.push({
          policy_year: year,
          premium: Number(premiumVal),
          sum_assured: Number(saVal),
          bonus_rate: Number(bonusRate.toFixed(2)),
          bonus_amount: Number(bonusAmount.toFixed(0)),
          total_benefit: Number(totalBenefit.toFixed(0)),
          net_cashflow: Number(netCash.toFixed(0)),
        });

      bonusRate += 0.5;
    }

    setTable(rows);
    await axios.post(`${API}/save-table`, rows, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div>
      <h3>Insurance Form</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>DOB</label><br/>
      <input type="date"
        onChange={(e) => {
          setDob(e.target.value);
          calcAge(e.target.value);
        }}
      />
      <p>Age: {age}</p>

      <label>Premium</label><br/>
      <input
        type="number"
        value={premium}
        onChange={(e) => setPremium(Number(e.target.value))}
      />

      <br/><br/>
      <label>Policy Type</label><br/>
      <select value={policyType} onChange={(e)=>setPolicyType(e.target.value)}>
        <option value="">Select Policy Type</option>
        <option>Term Life Insurance</option>
        <option>General Insurance</option>
        <option>Health Insurance</option>
        <option>Travel Insurance</option>
      </select>

      <br/><br/>
      <label>Payment Option</label><br/>
      <select value={paymentOption} onChange={(e)=>setPaymentOption(e.target.value)}>
        <option value="">Select Payment Option</option>
        <option>PhonePe</option>
        <option>GPay</option>
        <option>NetBanking</option>
      </select>

      <br/><br/>
      <label>Riders</label><br/>

      <select
        value={riders}
        onChange={(e) => setRiders(e.target.value)}
      >
        <option value="">Select Riders</option>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <br/><br/>
      <label>Premium Frequency</label><br/>
      
      <select value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
        <option value="">Select Frequency</option>
        <option>Yearly</option>
        <option>Half-Yearly</option>
        <option>Monthly</option>
      </select>

      <br/><br/>
      <br/><br/>
      <label>Policy Term (PT)</label><br/>
      <input
        type="number"
        value={pt}
        onChange={(e) => setPt(e.target.value)}
      />

      <br/><br/>
      <label>Premium Paying Term (PPT)</label><br/>
      <input
        type="number"
        value={ppt}
        onChange={(e) => setPpt(e.target.value)}
      />
      <br/><br/>
      <button onClick={calcSumAssured}>Calculate Sum Assured</button>
      <p>Sum Assured: {sumAssured}</p>

      <button onClick={submit}>Submit</button>
      <button onClick={calculateFinal} style={{marginLeft:10}}>
        Final Output
      </button>

      {table.length > 0 && (
        <table border="1" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Policy Year</th>
              <th>Premium</th>
              <th>Sum Assured</th>
              <th>Bonus Rate</th>
              <th>Bonus Amount</th>
              <th>Total Benefit</th>
              <th>Net Cashflow</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                <td>{row.policy_year}</td>
                <td>{row.premium}</td>
                <td>{row.sum_assured}</td>
                <td>{row.bonus_rate}</td>
                <td>{row.bonus_amount}</td>
                <td>{row.total_benefit}</td>
                <td>{row.net_cashflow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default App;

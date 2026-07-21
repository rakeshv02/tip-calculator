import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [customTip, setCustomTip] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [people, setPeople] = useState(1);

  const quickTips = [5, 10, 15, 18, 20, 25];

  const activeTip = useCustom ? (parseFloat(customTip) || 0) : tipPercent;
  const billAmount = parseFloat(bill) || 0;
  const tipAmount = billAmount * (activeTip / 100);
  const totalAmount = billAmount + tipAmount;
  const perPersonBill = billAmount / people;
  const perPersonTip = tipAmount / people;
  const perPersonTotal = totalAmount / people;

  const fmt = (n) => n.toFixed(2);

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  const resultRow = (label, value, highlight = false) => (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <span style={{ fontSize: "14px", color: highlight ? "#111827" : "#6b7280", fontWeight: highlight ? "700" : "500" }}>{label}</span>
      <span style={{ fontSize: highlight ? "22px" : "16px", fontWeight: "800", color: highlight ? "#6366f1" : "#111827" }}>${value}</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "15px", fontWeight: "700", color: "#6366f1", textDecoration: "none" }}>⌘ Tabutility</a>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Free Online Tools</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", margin: "0 0 8px 0" }}>Tip & Bill Split Calculator</h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 28px 0" }}>
          Calculate tip, split the bill, and see exactly what each person owes.
        </p>

        {/* Input card */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px" }}>

          {/* Bill amount */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Bill Amount ($)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#6b7280", fontWeight: "600" }}>$</span>
              <input
                type="number"
                placeholder="0.00"
                value={bill}
                onChange={e => setBill(e.target.value)}
                min="0"
                style={{ ...inputStyle, paddingLeft: "28px" }}
              />
            </div>
          </div>

          {/* Tip percentage */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Tip Percentage</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
              {quickTips.map(t => (
                <button
                  key={t}
                  onClick={() => { setTipPercent(t); setUseCustom(false); setCustomTip(""); }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "2px solid",
                    borderColor: (!useCustom && tipPercent === t) ? "#6366f1" : "#e5e7eb",
                    background: (!useCustom && tipPercent === t) ? "#6366f1" : "#fff",
                    color: (!useCustom && tipPercent === t) ? "#fff" : "#374151",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {t}%
                </button>
              ))}
              <button
                onClick={() => setUseCustom(true)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "2px solid",
                  borderColor: useCustom ? "#6366f1" : "#e5e7eb",
                  background: useCustom ? "#6366f1" : "#fff",
                  color: useCustom ? "#fff" : "#374151",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Custom
              </button>
            </div>
            {useCustom && (
              <input
                type="number"
                placeholder="Enter custom tip %"
                value={customTip}
                onChange={e => setCustomTip(e.target.value)}
                min="0"
                max="100"
                style={inputStyle}
                autoFocus
              />
            )}
          </div>

          {/* Number of people */}
          <div>
            <label style={labelStyle}>Split Between</label>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setPeople(p => Math.max(1, p - 1))}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #e5e7eb",
                  background: "#fff", fontSize: "20px", fontWeight: "700", cursor: "pointer", color: "#374151",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >−</button>
              <div style={{ textAlign: "center", minWidth: "80px" }}>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#111827" }}>{people}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{people === 1 ? "person" : "people"}</div>
              </div>
              <button
                onClick={() => setPeople(p => Math.min(50, p + 1))}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #e5e7eb",
                  background: "#fff", fontSize: "20px", fontWeight: "700", cursor: "pointer", color: "#374151",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >+</button>
              <input
                type="range"
                min="1"
                max="20"
                value={people}
                onChange={e => setPeople(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: "#6366f1" }}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: "grid", gridTemplateColumns: people > 1 ? "1fr 1fr" : "1fr", gap: "16px", marginBottom: "32px" }}>

          {/* Total breakdown */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
              {people > 1 ? "Full Bill" : "Your Bill"}
            </div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "12px" }}>
              {activeTip}% tip applied
            </div>
            {resultRow("Bill", fmt(billAmount))}
            {resultRow("Tip", fmt(tipAmount))}
            {resultRow("Total", fmt(totalAmount), true)}
          </div>

          {/* Per person breakdown */}
          {people > 1 && (
            <div style={{ background: "#6366f1", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Per Person
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>
                Split {people} ways
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Bill</span>
                <span style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>${fmt(perPersonBill)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Tip</span>
                <span style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>${fmt(perPersonTip)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", fontWeight: "700" }}>Each pays</span>
                <span style={{ fontSize: "22px", fontWeight: "900", color: "#fff" }}>${fmt(perPersonTotal)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "14px", color: "#6366f1", textDecoration: "none", fontWeight: "600" }}>
            ← Back to all free tools
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ACCENT = "#00e9a3";
const ADMIN_KEY = "hackathon-admin-pw";

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
}
interface VoterInfo {
  id: string;
  name: string;
  voted: boolean;
}
interface State {
  configured: boolean;
  votingOpen: boolean;
  projects: Project[];
  voters: VoterInfo[];
  tally: Record<string, number>;
  votedCount: number;
  totalVoters: number;
  complete: boolean;
  winnerIds: string[];
}

export default function HackathonSummaryPage() {
  const [state, setState] = useState<State | null>(null);
  const [showNames, setShowNames] = useState(false);
  const [password, setPassword] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminMsg, setAdminMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/hackathon/state", { cache: "no-store" });
    setState(await res.json());
  }, []);

  // Realtime-ish: poll every 2s.
  useEffect(() => {
    load();
    timer.current = setInterval(load, 2000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [load]);

  // Restore a previously entered admin password.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_KEY) : null;
    if (saved) {
      setPassword(saved);
      setAdminUnlocked(true);
    }
  }, []);

  const runAdmin = async (action: "open" | "close" | "reset", pw?: string) => {
    const usePw = pw ?? password;
    setBusy(true);
    setAdminMsg(null);
    try {
      const res = await fetch("/api/hackathon/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: usePw, action }),
      });
      const data = await res.json();
      if (data.ok) {
        setAdminUnlocked(true);
        sessionStorage.setItem(ADMIN_KEY, usePw);
        setAdminMsg(null);
        await load();
      } else {
        setAdminMsg(data.error ?? "Failed.");
        if (res.status === 401) setAdminUnlocked(false);
      }
    } catch {
      setAdminMsg("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const ranked = state
    ? [...state.projects]
        .map((p) => ({ ...p, count: state.tally[p.id] ?? 0 }))
        .sort((a, b) => b.count - a.count)
    : [];
  const maxCount = Math.max(1, ...ranked.map((r) => r.count));
  const winners = state
    ? state.projects.filter((p) => state.winnerIds.includes(p.id))
    : [];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflow: "auto",
        background:
          "radial-gradient(1200px 600px at 80% -10%, rgba(0,233,163,.18), transparent), radial-gradient(1000px 700px at 10% 10%, rgba(99,102,241,.16), transparent), #0a0f0d",
        color: "#e7f5ef",
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 14, letterSpacing: 2, color: ACCENT, fontWeight: 700 }}>
            LIVE RESULTS
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: "8px 0 4px" }}>
            Hackathon Voting Summary 📊
          </h1>
          <a href="/hackathon" style={{ color: "#9fb8ae", fontSize: 14, textDecoration: "none" }}>
            ← back to voting
          </a>
        </div>

        {!state ? (
          <p style={{ textAlign: "center", color: "#9fb8ae" }}>Loading…</p>
        ) : (
          <>
            <StatusStrip state={state} />

            {state.complete && winners.length > 0 ? (
              <WinnerBanner winners={winners} tie={winners.length > 1} />
            ) : null}

            <Progress votedCount={state.votedCount} total={state.totalVoters} />

            <Bars ranked={ranked} maxCount={maxCount} winnerIds={state.winnerIds} />

            <VoterList
              voters={state.voters}
              showNames={showNames}
              onToggle={() => setShowNames((s) => !s)}
            />

            <AdminPanel
              configured={state.configured}
              votingOpen={state.votingOpen}
              unlocked={adminUnlocked}
              password={password}
              setPassword={setPassword}
              busy={busy}
              msg={adminMsg}
              onRun={runAdmin}
            />
          </>
        )}
      </div>
    </div>
  );
}

function StatusStrip({ state }: { state: State }) {
  const open = state.votingOpen;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginBottom: 20,
      }}
    >
      <span
        style={{
          padding: "6px 14px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 13,
          background: open ? "rgba(0,233,163,.15)" : "rgba(255,255,255,.06)",
          border: `1px solid ${open ? ACCENT : "rgba(255,255,255,.15)"}`,
          color: open ? ACCENT : "#9fb8ae",
        }}
      >
        {open ? "● Voting OPEN" : "○ Voting CLOSED"}
      </span>
    </div>
  );
}

function WinnerBanner({
  winners,
  tie,
}: {
  winners: { id: string; name: string; emoji: string }[];
  tie: boolean;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "28px 20px",
        borderRadius: 20,
        marginBottom: 24,
        background:
          "linear-gradient(135deg, rgba(0,233,163,.22), rgba(99,102,241,.18))",
        border: `1.5px solid ${ACCENT}`,
      }}
    >
      <div style={{ fontSize: 40 }}>🏆</div>
      <div style={{ fontSize: 13, letterSpacing: 2, color: ACCENT, fontWeight: 700 }}>
        {tie ? "IT'S A TIE!" : "WINNER"}
      </div>
      {winners.map((w) => (
        <div key={w.id} style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>
          {w.emoji} {w.name}
        </div>
      ))}
      <p style={{ color: "#cfe7dd", margin: "10px 0 0", fontSize: 14 }}>
        🚲 e-bikes incoming — congrats!
      </p>
    </div>
  );
}

function Progress({ votedCount, total }: { votedCount: number; total: number }) {
  const pct = total ? Math.round((votedCount / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#9fb8ae",
          marginBottom: 6,
        }}
      >
        <span>Turnout</span>
        <span>
          {votedCount} / {total} voted ({pct}%)
        </span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(255,255,255,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: ACCENT,
            transition: "width .4s ease",
          }}
        />
      </div>
    </div>
  );
}

function Bars({
  ranked,
  maxCount,
  winnerIds,
}: {
  ranked: { id: string; name: string; emoji: string; count: number }[];
  maxCount: number;
  winnerIds: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
      {ranked.map((r, i) => {
        const isWinner = winnerIds.includes(r.id) && r.count > 0;
        return (
          <div
            key={r.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 12,
              background: isWinner ? "rgba(0,233,163,.1)" : "rgba(255,255,255,.035)",
              border: `1px solid ${isWinner ? ACCENT : "rgba(255,255,255,.08)"}`,
            }}
          >
            <span style={{ width: 20, color: "#6f8a80", fontWeight: 700, fontSize: 13 }}>
              {i + 1}
            </span>
            <span style={{ fontSize: 20 }}>{r.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {r.name}
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                  marginTop: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(r.count / maxCount) * 100}%`,
                    background: isWinner
                      ? ACCENT
                      : "linear-gradient(90deg, rgba(0,233,163,.7), rgba(99,102,241,.7))",
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 18,
                color: isWinner ? ACCENT : "#e7f5ef",
                minWidth: 24,
                textAlign: "right",
              }}
            >
              {r.count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function VoterList({
  voters,
  showNames,
  onToggle,
}: {
  voters: VoterInfo[];
  showNames: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Who has voted</h3>
        <button
          onClick={onToggle}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,.2)",
            color: "#cfe7dd",
            borderRadius: 10,
            padding: "5px 12px",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {showNames ? "🙈 Hide names" : "👁️ Show names"}
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {voters.map((v, i) => (
          <span
            key={v.id}
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              background: v.voted ? "rgba(0,233,163,.14)" : "rgba(255,255,255,.05)",
              border: `1px solid ${v.voted ? "rgba(0,233,163,.5)" : "rgba(255,255,255,.12)"}`,
              color: v.voted ? ACCENT : "#8ba79c",
            }}
          >
            {v.voted ? "✓ " : "· "}
            {showNames ? v.name : `Voter #${i + 1}`}
          </span>
        ))}
      </div>
    </div>
  );
}

function AdminPanel({
  configured,
  votingOpen,
  unlocked,
  password,
  setPassword,
  busy,
  msg,
  onRun,
}: {
  configured: boolean;
  votingOpen: boolean;
  unlocked: boolean;
  password: string;
  setPassword: (v: string) => void;
  busy: boolean;
  msg: string | null;
  onRun: (action: "open" | "close" | "reset", pw?: string) => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        background: "rgba(255,255,255,.03)",
        border: "1px dashed rgba(255,255,255,.15)",
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>🔒 Admin</h3>

      {!configured ? (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            marginBottom: 12,
            background: "rgba(255,180,80,.12)",
            border: "1px solid rgba(255,180,80,.4)",
            color: "#ffd9a8",
            fontSize: 13,
          }}
        >
          ⚠️ Redis isn't reachable from this deployment (UPSTASH_REDIS_REST_URL /
          _TOKEN missing for this environment). Admin actions will fail until it's
          set for this environment and redeployed.
        </div>
      ) : null}

      {!unlocked ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRun(votingOpen ? "close" : "open", password);
          }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            style={{
              flex: 1,
              minWidth: 180,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,.15)",
              background: "rgba(0,0,0,.25)",
              color: "#e7f5ef",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            disabled={busy}
            style={{
              background: ACCENT,
              color: "#052018",
              fontWeight: 700,
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
          >
            Unlock & {votingOpen ? "close" : "open"} voting
          </button>
        </form>
      ) : (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {votingOpen ? (
            <button
              onClick={() => onRun("close")}
              disabled={busy}
              style={btn("#ff8a5a")}
            >
              ⏹ Close voting
            </button>
          ) : (
            <button
              onClick={() => onRun("open")}
              disabled={busy}
              style={btn(ACCENT)}
            >
              ▶ Open voting
            </button>
          )}

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              disabled={busy}
              style={{
                ...btn("transparent"),
                color: "#ff9a9a",
                border: "1px solid rgba(255,120,120,.4)",
              }}
            >
              Reset all votes
            </button>
          ) : (
            <span style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
              Sure?
              <button
                onClick={() => {
                  onRun("reset");
                  setConfirmReset(false);
                }}
                disabled={busy}
                style={{ ...btn("#ff5a5a"), color: "#fff" }}
              >
                Yes, wipe
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                style={{ ...btn("transparent"), border: "1px solid rgba(255,255,255,.2)", color: "#cfe7dd" }}
              >
                Cancel
              </button>
            </span>
          )}
          <span style={{ color: "#6f8a80", fontSize: 12 }}>unlocked</span>
        </div>
      )}

      {msg ? (
        <p style={{ color: "#ffb3b3", fontSize: 13, margin: "10px 0 0" }}>{msg}</p>
      ) : null}
    </div>
  );
}

function btn(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: bg === "transparent" ? "#cfe7dd" : "#052018",
    fontWeight: 700,
    padding: "9px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
  };
}

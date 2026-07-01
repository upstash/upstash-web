"use client";

import { useCallback, useEffect, useState } from "react";

const ACCENT = "#00e9a3";
const STORAGE_KEY = "hackathon-voter-id";

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  members: string[];
}
interface VoterInfo {
  id: string;
  name: string;
  ownProjectId: string | null;
  voted: boolean;
}
interface State {
  configured: boolean;
  votingOpen: boolean;
  maxVotes: number;
  projects: Project[];
  voters: VoterInfo[];
  votedCount: number;
  totalVoters: number;
  complete: boolean;
  myBallot: string[] | null;
}

export default function HackathonVotePage() {
  const [state, setState] = useState<State | null>(null);
  const [voterId, setVoterId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );

  const load = useCallback(async (vid: string | null) => {
    const url = vid ? `/api/hackathon/state?voter=${vid}` : "/api/hackathon/state";
    const res = await fetch(url, { cache: "no-store" });
    const data: State = await res.json();
    setState(data);
    if (vid && data.myBallot) setSelected(data.myBallot);
    return data;
  }, []);

  // Initial load + restore saved identity.
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    setVoterId(saved);
    load(saved);
  }, [load]);

  const me = state?.voters.find((v) => v.id === voterId) ?? null;

  const pickName = async (id: string) => {
    setVoterId(id);
    localStorage.setItem(STORAGE_KEY, id);
    setMessage(null);
    setSelected([]);
    await load(id);
  };

  const changeName = () => {
    setVoterId(null);
    localStorage.removeItem(STORAGE_KEY);
    setSelected([]);
    setMessage(null);
  };

  const toggle = (projectId: string) => {
    setMessage(null);
    setSelected((prev) => {
      if (prev.includes(projectId)) return prev.filter((x) => x !== projectId);
      if (prev.length >= (state?.maxVotes ?? 5)) return prev; // hard cap
      return [...prev, projectId];
    });
  };

  const submit = async () => {
    if (!voterId) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/hackathon/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId, projectIds: selected }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessage({ kind: "ok", text: "Your vote is saved! You can change it any time while voting is open." });
        await load(voterId);
      } else {
        setMessage({ kind: "err", text: data.error ?? "Something went wrong." });
      }
    } catch {
      setMessage({ kind: "err", text: "Network error. Try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflow: "auto",
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(0,233,163,.18), transparent), radial-gradient(1000px 700px at 90% 10%, rgba(99,102,241,.16), transparent), #0a0f0d",
        color: "#e7f5ef",
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
        <Header />

        {!state ? (
          <Loading />
        ) : !state.configured ? (
          <Notice text="Voting storage isn't configured yet (missing Redis env vars)." />
        ) : !voterId || !me ? (
          <NamePicker voters={state.voters} onPick={pickName} />
        ) : (
          <>
            <IdentityBar name={me.name} onChange={changeName} />

            {!state.votingOpen ? (
              <ClosedState complete={state.complete} />
            ) : (
              <VotePanel
                projects={state.projects}
                selected={selected}
                ownProjectId={me.ownProjectId}
                maxVotes={state.maxVotes}
                onToggle={toggle}
                onSubmit={submit}
                saving={saving}
                message={message}
                alreadyVoted={me.voted}
              />
            )}
          </>
        )}

        <Footer votedCount={state?.votedCount} totalVoters={state?.totalVoters} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ fontSize: 14, letterSpacing: 2, color: ACCENT, fontWeight: 700 }}>
        UPSTASH · 2026 SUMMER HACKATHON
      </div>
      <h1 style={{ fontSize: 40, fontWeight: 800, margin: "10px 0 4px", lineHeight: 1.1 }}>
        Cast your votes 🗳️
      </h1>
      <p style={{ color: "#9fb8ae", margin: 0 }}>
        Pick up to <b style={{ color: ACCENT }}>5</b> projects. You can't vote for your
        own — winners get an e-bike 🚲
      </p>
    </div>
  );
}

function Loading() {
  return <p style={{ textAlign: "center", color: "#9fb8ae" }}>Loading…</p>;
}

function Notice({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        color: "#ffd9a8",
      }}
    >
      {text}
    </div>
  );
}

function NamePicker({
  voters,
  onPick,
}: {
  voters: VoterInfo[];
  onPick: (id: string) => void;
}) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        Who are you?
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 10,
        }}
      >
        {voters.map((v) => (
          <button
            key={v.id}
            onClick={() => onPick(v.id)}
            style={{
              padding: "14px 10px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.04)",
              color: "#e7f5ef",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.background = "rgba(0,233,163,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
              e.currentTarget.style.background = "rgba(255,255,255,.04)";
            }}
          >
            {v.name}
            {v.voted ? <span style={{ color: ACCENT }}> ✓</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function IdentityBar({ name, onChange }: { name: string; onChange: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 14,
        padding: "12px 16px",
        marginBottom: 20,
      }}
    >
      <div>
        Voting as <b style={{ color: ACCENT }}>{name}</b>
      </div>
      <button
        onClick={onChange}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,.2)",
          color: "#cfe7dd",
          borderRadius: 10,
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Not you? Switch
      </button>
    </div>
  );
}

function ClosedState({ complete }: { complete: boolean }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "48px 24px",
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 18,
      }}
    >
      <div style={{ fontSize: 44 }}>{complete ? "🏆" : "⏳"}</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "10px 0 6px" }}>
        {complete ? "Voting is closed" : "Voting hasn't started yet"}
      </h2>
      <p style={{ color: "#9fb8ae", margin: "0 0 18px" }}>
        {complete
          ? "The votes are locked in. Head to the summary to see the results."
          : "Hang tight — the admin will open voting soon."}
      </p>
      <a
        href="/hackathon/summary"
        style={{
          display: "inline-block",
          background: ACCENT,
          color: "#052018",
          fontWeight: 700,
          padding: "10px 18px",
          borderRadius: 12,
          textDecoration: "none",
        }}
      >
        View live summary →
      </a>
    </div>
  );
}

function VotePanel({
  projects,
  selected,
  ownProjectId,
  maxVotes,
  onToggle,
  onSubmit,
  saving,
  message,
  alreadyVoted,
}: {
  projects: Project[];
  selected: string[];
  ownProjectId: string | null;
  maxVotes: number;
  onToggle: (id: string) => void;
  onSubmit: () => void;
  saving: boolean;
  message: { kind: "ok" | "err"; text: string } | null;
  alreadyVoted: boolean;
}) {
  const remaining = maxVotes - selected.length;
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 16px",
          marginBottom: 16,
          background: "rgba(10,15,13,.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,233,163,.25)",
          borderRadius: 14,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          <span style={{ color: ACCENT, fontSize: 20 }}>{selected.length}</span>
          <span style={{ color: "#9fb8ae" }}> / {maxVotes} selected</span>
          {alreadyVoted ? (
            <span style={{ color: "#9fb8ae", fontWeight: 400 }}> · you've voted</span>
          ) : null}
        </div>
        <button
          onClick={onSubmit}
          disabled={saving}
          style={{
            background: ACCENT,
            color: "#052018",
            fontWeight: 800,
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            cursor: saving ? "default" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving…" : alreadyVoted ? "Update my vote" : "Submit vote"}
        </button>
      </div>

      {message ? (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            marginBottom: 16,
            background:
              message.kind === "ok" ? "rgba(0,233,163,.12)" : "rgba(255,90,90,.12)",
            border: `1px solid ${message.kind === "ok" ? ACCENT : "#ff5a5a"}`,
            color: message.kind === "ok" ? ACCENT : "#ffb3b3",
          }}
        >
          {message.text}
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {projects.map((p) => {
          const isOwn = p.id === ownProjectId;
          const isSelected = selected.includes(p.id);
          const disabledByCap = !isSelected && remaining <= 0;
          const disabled = isOwn || disabledByCap;
          return (
            <button
              key={p.id}
              onClick={() => !isOwn && onToggle(p.id)}
              disabled={isOwn}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: 16,
                cursor: isOwn ? "not-allowed" : "pointer",
                background: isSelected
                  ? "rgba(0,233,163,.14)"
                  : "rgba(255,255,255,.035)",
                border: `1.5px solid ${
                  isSelected ? ACCENT : "rgba(255,255,255,.1)"
                }`,
                opacity: disabled && !isSelected ? 0.5 : 1,
                transition: "all .15s",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>{p.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 16, flex: 1 }}>{p.name}</span>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: `1.5px solid ${isSelected ? ACCENT : "rgba(255,255,255,.3)"}`,
                    background: isSelected ? ACCENT : "transparent",
                    color: "#052018",
                    fontWeight: 900,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isSelected ? "✓" : ""}
                </span>
              </div>
              <p style={{ color: "#9fb8ae", fontSize: 13, margin: "10px 0 0", lineHeight: 1.5 }}>
                {p.description}
              </p>
              {isOwn ? (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#ffd9a8",
                    background: "rgba(255,180,80,.15)",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  YOUR PROJECT
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Footer({
  votedCount,
  totalVoters,
}: {
  votedCount?: number;
  totalVoters?: number;
}) {
  return (
    <div style={{ textAlign: "center", marginTop: 36, color: "#6f8a80", fontSize: 13 }}>
      {typeof votedCount === "number" ? (
        <span>
          {votedCount} / {totalVoters} people have voted ·{" "}
        </span>
      ) : null}
      <a href="/hackathon/summary" style={{ color: ACCENT, textDecoration: "none" }}>
        Live summary & winner →
      </a>
    </div>
  );
}

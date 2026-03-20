"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Sending...");

    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Saved!");
      setTitle("");
      router.refresh(); // ← re-runs Server Component, osvežava listu
    } else {
      setMsg(data.message || "Error");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
      />
      <button type="submit">Save</button>
      <p>{msg}</p>
    </form>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      name: "Return Request",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id} and was wondering if I could return this.`,
    },
    {
      name: "Return - Unopened Item",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id} and was wondering if I could return this. The item has never been opened and is still in its original packaging.`,
    },
    {
      name: "Package Missing",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id}. Unfortunately, my package hasn't arrived yet and I was wondering if you could help me track it down.`,
    },
    {
      name: "Package Opened",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id}. My package arrived but it appeared to have been opened or damaged during shipping. Could you please assist me with this issue?`,
    },
    {
      name: "Arrived Too Late",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id}. Unfortunately, the package arrived too late and I no longer need it. Could I please return this item?`,
    },
    {
      name: "General Inquiry",
      message: (id: string) =>
        `Hi, I hope you're doing well. I'm reaching out about my Order ${id}. Could you please provide me with an update on this order?`,
    },
  ];

  const handlePresetClick = (presetMessage: (id: string) => string) => {
    const orderIdText = orderId.trim() ? `${orderId.trim()}` : "[ORDER ID]";
    setMessage(presetMessage(orderIdText));
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col gap-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            Support Message Maker
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Create professional support messages in seconds
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-900">
          <label
            htmlFor="orderId"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Order ID Number
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Message Presets
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetClick(preset.message)}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Generated Message
              </h2>
              <button
                onClick={copyToClipboard}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-800">
              <p className="whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
                {message}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
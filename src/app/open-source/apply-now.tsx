"use client";

import Button from "@/components/button";
import { useState } from "react";

export const ApplyNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    twitter: "",
    githubRepo: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await fetch("/api/apply-for-open-source", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setFormData({
        name: "",
        twitter: "",
        githubRepo: "",
        notes: "",
      });
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-left">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-white"
          >
            Your name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-emerald-800/40 bg-white/5 px-4 py-3 text-white transition placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            placeholder="Enter your full name"
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="twitter"
            className="mb-2 block text-sm font-medium text-white"
          >
            Twitter/X username <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            required
            value={formData.twitter}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-emerald-800/40 bg-white/5 px-4 py-3 text-white transition placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            placeholder="@username"
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="githubRepo"
            className="mb-2 block text-sm font-medium text-white"
          >
            GitHub repo <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            id="githubRepo"
            name="githubRepo"
            required
            value={formData.githubRepo}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-emerald-800/40 bg-white/5 px-4 py-3 text-white transition placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            placeholder="https://github.com/username/repository"
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-white"
          >
            Additional notes{" "}
            <span className="font-normal text-white/60">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full resize-none rounded-xl border border-emerald-800/40 bg-white/5 px-4 py-3 text-white transition placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            placeholder="Tell us about your project, how you plan to use Upstash, or any other relevant information..."
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full justify-center px-8 py-3 text-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
};

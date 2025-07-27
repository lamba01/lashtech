import { useState } from "react";

const ReminderTemplate = () => {
  const [copied, setCopied] = useState(false);

  const message = `Subject: Appointment Reminder – Mcken Beauty Place

Hi there,

This is a friendly reminder that you have an upcoming appointment with us at Mcken Beauty Place.

If you need to make any changes or have questions about your booking, feel free to get in touch. We’re looking forward to having you!

—
Mcken Beauty Place
WhatsApp: 08183698673
Instagram: @lashes.brows.beautyy`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy. Please copy manually.");
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="mt-8 max-w-xl">
      <h2 className="text-lg font-medium mb-2">Reminder Message</h2>
      <textarea
        readOnly
        rows={8}
        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
        value={message}
      />
      <button
        onClick={handleCopy}
        className={`mt-2 px-4 py-2 text-white rounded text-sm transition-colors ${
          copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {copied ? "Copied!" : "Copy Message"}
      </button>
    </div>
  );
};

export default ReminderTemplate;

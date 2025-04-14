import { useEffect, useState } from "react";
import { HLEmbed, getCurrentUser } from "@highleveldev/embedded-sdk";

export default function App() {
  const [locationId, setLocationId] = useState(null);

  useEffect(() => {
    // ✅ Initialize the SDK first
    HLEmbed.init();

    // ✅ Then safely fetch the user
    getCurrentUser().then((user) => {
      setLocationId(user?.locationId);
    });
  }, []);

  const links = [
    {
      label: "📅 Connect Calendar",
      path: `/locations/${locationId}/calendar/settings`,
    },
    {
      label: "📥 Import Contacts",
      path: `/locations/${locationId}/contacts/import`,
    },
    {
      label: "⚙️ Create Workflow",
      path: `/locations/${locationId}/workflows`,
    },
  ];

  const handleClick = (path) => {
    if (locationId) {
      window.location.href = `https://app.gohighlevel.com${path}`;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">🚀 Let’s Set Up Your Account</h1>
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => handleClick(link.path)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}

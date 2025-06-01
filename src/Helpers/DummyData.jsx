export const getStatusClass = (status) => {
  switch (status) {
    case "resolved":
      return "bg-green-500 text-white";
    case "In Progress":
      return "bg-blue-400 text-white";
    case "Escalated":
      return "bg-red-500 text-white";
      case "open":
        return "bg-red-400 text-white";
        case "Pending":
          return "bg-red-400 text-white";
          case "reopened":
            return "bg-blue-400 text-white";
    case "closed":
      return "bg-yellow-400 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-amber-500";
    default:
      return "bg-blue-500";
  }
};

export const timeAgo = (dateString) => {
  if (!dateString) return "N/A";
  const now = new Date();
  const updated = new Date(dateString);
  const diffMs = now - updated;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

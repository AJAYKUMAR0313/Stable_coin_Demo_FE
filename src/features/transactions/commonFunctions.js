const statusStyle = (status) => {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

 const formatDate = (timestamp) => {
  if (!timestamp) return "-";

  // If it's a number (unix timestamp)
  if (typeof timestamp === "number") {
    // seconds → ms
    return new Date(
      timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
    ).toLocaleString();
  }

  // If it's an ISO string
  if (typeof timestamp === "string") {
    return new Date(timestamp).toLocaleString();
  }

  return "-";
};


export { statusStyle, formatDate };
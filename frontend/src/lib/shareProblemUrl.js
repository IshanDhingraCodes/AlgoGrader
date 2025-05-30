export const shareProblem = (problemTitle, url) => {
  if (navigator.share) {
    navigator
      .share({
        title: problemTitle,
        text: `Check out this problem: ${problemTitle}`,
        url: url,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  }
};

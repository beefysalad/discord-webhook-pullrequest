const axios = require("axios");

const discordWebhookUrl =
  "https://discord.com/api/webhooks/1285929730951872583/uFnI8Z7Inf4U-ggw5vJ3fzKqvWWIRgA0i1A1SPjXIpM4jFQPWNjocNbdbonm9Awik2Hu";

export default async (req, res) => {
  if (req.method === "POST") {
    const pullRequestDetails = req.body;

    const message = {
      content: `New Pull Request: ${pullRequestDetails.title}\n${pullRequestDetails.html_url}`,
    };

    try {
      await axios.post(discordWebhookUrl, message);
      return res.status(200).json({ message: "Notification sent to Discord" });
    } catch (error) {
      console.error("Error sending notification to Discord:", error);
      return res.status(500).json({ error: "Failed to send notification" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

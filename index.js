const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const discordWebhookUrl =
  "https://discord.com/api/webhooks/1285938065457807370/so-pdAZO2i1bFqCe-b0JwKBJ4DR35GwTrsrvPPPEHPs0XuNomzVbzotLlSeLNxJJFyJ6";

const sendDiscordNotification = (pullRequestDetails) => {
  const message = {
    content: `<@&725274482226495558> New Pull Request: ${pullRequestDetails.title}\n${pullRequestDetails.url}`,
  };

  return axios
    .post(discordWebhookUrl, message)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.error("Error sending notification to Discord:", error);
      return { success: false, error: error.message };
    });
};

// Endpoint to trigger the notification
app.post("/notify", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).send({ error: "Missing pull request details" });
  }

  sendDiscordNotification({ title, url }).then((result) => {
    if (result.success) {
      res.status(200).send({ message: "Notification sent successfully" });
    } else {
      res
        .status(500)
        .send({ message: "Error sending notification", error: result.error });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Webhook Notification Service is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// This file contains the JavaScript code for the travel journal application. 
// It handles user interactions, such as generating the travel journal based on user input and making API calls if necessary.

async function generateJournal() {
  const destination = document.getElementById("destination").value;
  const days = document.getElementById("days").value;
  const activities = document.getElementById("activities").value;
  const journalText = document.getElementById("journalText");
  const resultDiv = document.getElementById("result");
  const btn = document.getElementById("generateBtn");

  btn.disabled = true;
  btn.textContent = "Generating...";

  const prompt = `Generate a travel journal for a ${days}-day trip to ${destination}. Include the following activities: ${activities}. The tone should be warm, friendly, and detailed.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  journalText.textContent = data.choices[0].message.content;
  resultDiv.style.display = "block";
  btn.disabled = false;
  btn.textContent = "Generate Journal";
}
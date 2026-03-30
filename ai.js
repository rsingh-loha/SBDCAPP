export async function handler(event) {

  const { prompt } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();

  const text =
    data?.choices?.[0]?.message?.content ||
    "No response from AI";

  return {
    statusCode: 200,
    body: JSON.stringify({ text })
  };
}

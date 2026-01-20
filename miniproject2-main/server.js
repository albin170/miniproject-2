import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/analyze", async (req, res) => {
    const { symptom } = req.body;

    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a rural healthcare assistant. Explain possible health issues in simple words. Do not diagnose or prescribe medicines."
                        },
                        {
                            role: "user",
                            content: symptom
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!data.choices) {
            return res.json({
                result: "OpenAI error. Check API key or quota."
            });
        }

        res.json({
            result: data.choices[0].message.content
        });

    } catch (error) {
        res.json({
            result: "Error connecting to OpenAI service."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

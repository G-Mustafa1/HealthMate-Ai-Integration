const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const buildPromptForReport = () => `
You will receive a PDF or image.

Analyze ONLY medical reports such as blood tests, lab reports, X-ray, CT, MRI, ultrasound, ECG, pathology, or other clearly medical reports.

If the file is NOT a medical report, return:
{
  "is_medical_report": false,
  "title": "",
  "date": "",
  "summary": "",
  "explanation_en": "",
  "explanation_ro": "",
  "suggested_questions": []
}

If the file IS a medical report, return:
{
  "is_medical_report": true,
  "title": "short medical report title",
  "date": "visible date or empty string",
  "summary": "short medical summary",
  "explanation_en": "simple and short explanation in English",
  "explanation_ro": "same explanation in Roman Urdu",
  "suggested_questions": ["up to 3 relevant questions"]
}

Roman Urdu rules:
- Use ONLY English/Latin letters.
- Do NOT use Urdu, Arabic, or Persian script.
- Do NOT translate word-by-word.
- Write natural, easy-to-understand Pakistani Roman Urdu.
- explanation_ro must explain the same information as explanation_en.

Use only information visible in the report.
Do not invent information.
Do not analyze non-medical files.
Keep the response concise.
Return ONLY valid JSON.
`;


async function analyzeFileBase64(
    fileBase64,
    mimeType = "application/pdf"
) {
    try {
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: buildPromptForReport()
                    },
                    {
                        inlineData: {
                            mimeType,
                            data: fileBase64
                        }
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                temperature: 0.1,
                responseMimeType: "application/json",
                maxOutputTokens: 1500
            }
        });

        const rawText =
            response.candidates?.[0]?.content?.parts?.[0]?.text || "";

        console.log(
            "🧾 Gemini Response:",
            rawText.slice(0, 500)
        );

        let parsed = null;

        try {
            parsed = JSON.parse(rawText);
        } catch (jsonErr) {
            console.warn(
                "⚠️ JSON Parse Error:",
                jsonErr.message
            );
        }

        if (!parsed) {
            return {
                ok: false,
                isMedicalReport: false,
                parsed: null,
                rawText
            };
        }

        if (parsed.is_medical_report !== true) {
            return {
                ok: true,
                isMedicalReport: false,
                parsed: {
                    is_medical_report: false,
                    title: "",
                    date: "",
                    summary: "",
                    explanation_en: "",
                    explanation_ro: "",
                    suggested_questions: []
                },
                rawText
            };
        }

        return {
            ok: true,
            isMedicalReport: true,
            parsed: {
                is_medical_report: true,
                title: parsed.title || "Medical Report",
                date: parsed.date || "",
                summary: parsed.summary || "",
                explanation_en: parsed.explanation_en || "",
                explanation_ro: parsed.explanation_ro || "",
                suggested_questions:
                    Array.isArray(parsed.suggested_questions)
                        ? parsed.suggested_questions.slice(0, 3)
                        : []
            },
            rawText
        };

    } catch (err) {
        console.error(
            "❌ Gemini AI Error:",
            err.message
        );

        return {
            ok: false,
            isMedicalReport: false,
            parsed: null,
            rawText: ""
        };
    }
}

module.exports = {
    analyzeFileBase64
};

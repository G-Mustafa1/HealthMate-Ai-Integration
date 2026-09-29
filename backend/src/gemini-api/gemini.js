const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const buildPromptForReport = () => `You will receive a PDF or image.

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
Return ONLY valid JSON.`;

async function analyzeFileBase64(fileBase64, mimeType = "application/pdf") {
    try {
        if (!fileBase64) throw new Error("File data is empty");
        if (!mimeType) mimeType = "application/pdf";

        console.log("🤖 Gemini analyzing:", { mimeType, base64Length: fileBase64.length });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: buildPromptForReport() }, { inlineData: { mimeType: mimeType, data: fileBase64 } }] }],
            config: { temperature: 0, responseMimeType: "application/json", maxOutputTokens: 2000 }
        });

        const rawText = response.text?.trim() || response.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("").trim() || "";

        console.log("🧾 Gemini Response:", rawText.slice(0, 1000));

        if (!rawText) {
            console.error("❌ Gemini returned empty response");
            return { ok: false, isMedicalReport: false, parsed: null, rawText: "", error: "Gemini returned an empty response" };
        }

        let parsed;

        try {
            parsed = JSON.parse(rawText);
        } catch (err) {
            console.error("❌ JSON Parse Error:", err.message);
            console.error("Raw Gemini output:", rawText);
            return { ok: false, isMedicalReport: false, parsed: null, rawText, error: "Gemini returned invalid JSON" };
        }

        if (typeof parsed !== "object" || parsed === null || typeof parsed.is_medical_report !== "boolean") {
            console.error("❌ Invalid Gemini JSON structure:", parsed);
            return { ok: false, isMedicalReport: false, parsed: null, rawText, error: "Invalid Gemini response structure" };
        }

        if (!parsed.is_medical_report) {
            return {
                ok: true,
                isMedicalReport: false,
                parsed: { is_medical_report: false, title: "", date: "", summary: "", explanation_en: "", explanation_ro: "", suggested_questions: [] },
                rawText
            };
        }

        return {
            ok: true,
            isMedicalReport: true,
            parsed: {
                is_medical_report: true,
                title: typeof parsed.title === "string" ? parsed.title : "Medical Report",
                date: typeof parsed.date === "string" ? parsed.date : "",
                summary: typeof parsed.summary === "string" ? parsed.summary : "",
                explanation_en: typeof parsed.explanation_en === "string" ? parsed.explanation_en : "",
                explanation_ro: typeof parsed.explanation_ro === "string" ? parsed.explanation_ro : "",
                suggested_questions: Array.isArray(parsed.suggested_questions) ? parsed.suggested_questions.filter(q => typeof q === "string").slice(0, 3) : []
            },
            rawText
        };

    } catch (err) {
        console.error("❌ Gemini AI Error:", err);
        return { ok: false, isMedicalReport: false, parsed: null, rawText: "", error: err?.message || "Gemini analysis failed" };
    }
}

module.exports = { analyzeFileBase64 };

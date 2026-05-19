const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.analyzeComplaint = async (req, res) => {

  try {

    const { description } = req.body;

    // TRY OPENAI FIRST

    const completion =
      await openai.chat.completions.create({

      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: `
Analyze this complaint:

${description}

Return:
Priority
Department
Summary
Auto Response
`
        }
      ],

      max_tokens: 200,
    });

    return res.json({
      result:
        completion.choices[0]
        .message.content
    });

  } catch (error) {

    console.log(
      "OPENAI FAILED -> USING LOCAL AI"
    );

    // FALLBACK AI LOGIC

    const text =
      req.body.description.toLowerCase();

    let priority = "Low";
    let department =
      "General Department";

    if (
      text.includes("fire") ||
      text.includes("electric")
    ) {

      priority = "High";
    }

    if (
      text.includes("water")
    ) {

      department =
        "Water Department";
    }

    else if (
      text.includes("garbage")
    ) {

      department =
        "Sanitation Department";
    }

    else if (
      text.includes("road")
    ) {

      department =
        "Road Maintenance Department";
    }

    const result = `
Priority:
${priority}

Department:
${department}

Summary:
${req.body.description.slice(0, 100)}

Auto Response:
Your complaint has been registered successfully.
`;

    res.json({
      result
    });
  }
};
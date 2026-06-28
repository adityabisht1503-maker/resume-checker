// resumeController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');



const genAI = new GoogleGenerativeAI(process.env.KEY);

const analyzeResume = async (req, res) => {
  console.log(typeof pdfParse);

  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'Please upload a resume file' 
      });
    }

    const file = req.file;
    let resumeText = '';

    // Extract text based on file type
    if (file.mimetype === 'application/pdf') {
      // Parse PDF
      const dataBuffer = file.buffer;
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword'
    ) {
      // Parse DOCX
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({ 
        success: false,
        message: 'Unsupported file format. Please upload PDF or DOCX' 
      });
    }

    // Check if text was extracted
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Could not extract text from the resume' 
      });
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // Create the prompt
    const prompt = `Analyze the following resume and provide feedback in JSON format only. Do not include any markdown formatting or code blocks.

Resume:
${resumeText}

Provide your analysis in the following JSON format:
{
  "rating": <number 1-10>,
  "strengths": [<array of 3-5 strength points>],
  "improvements": [<array of 3-5 improvement points>],
  "suggestions": "<detailed suggestions as a string>"
}

Focus on:
- Professional experience and achievements
- Skills and qualifications
- Resume structure and formatting
- ATS compatibility
- Impact and quantifiable results`;

    // Call Gemini API to analyze the resume
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse JSON from the response
    let analysis;
    try {
      // Try to find JSON in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to parse AI analysis' 
      });
    }
 req.user.analysisCount += 1;
    await req.user.save();

    // Return the analysis
    res.status(200).json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('Resume analysis error:', error);

    res.status(500).json({ 
      success: false,
      message: error.message || 'An error occurred while analyzing the resume' 
    });
  }
};

module.exports = {
  analyzeResume
};
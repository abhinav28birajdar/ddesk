import { AIPreVisitSummary, AIPostVisitSummary } from '@/types';

export interface AIProvider {
  generatePreVisitSummary(params: {
    symptoms: string;
    duration?: string;
    severity?: string;
    additionalNotes?: string;
  }): Promise<AIPreVisitSummary>;

  generatePostVisitSummary(params: {
    clinicalNotes: string;
    diagnosis?: string;
  }): Promise<AIPostVisitSummary>;
}

export class GeminiAIProvider implements AIProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async generatePreVisitSummary(params: {
    symptoms: string;
    duration?: string;
    severity?: string;
    additionalNotes?: string;
  }): Promise<AIPreVisitSummary> {
    if (!this.apiKey) {
      return this.fallbackPreVisitSummary(params);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a clinical assistant AI. Analyze these symptoms and return structured JSON ONLY with fields:
- urgency_level ("Low", "Medium", or "High")
- chief_complaint (short summary phrase)
- concise_summary (2-3 sentences summarizing symptoms, duration, and severity)
- suggested_questions (array of exactly 3 relevant questions for the doctor to ask)

Do NOT provide a diagnosis.

Patient Symptoms: ${params.symptoms}
Duration: ${params.duration || 'Not specified'}
Severity: ${params.severity || 'Not specified'}
Notes: ${params.additionalNotes || 'None'}`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error(`Gemini API error ${response.status}`);
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini');
      
      const parsed = JSON.parse(text);
      return {
        urgency_level: parsed.urgency_level || 'Medium',
        chief_complaint: parsed.chief_complaint || params.symptoms.slice(0, 40),
        concise_summary: parsed.concise_summary || `Patient reports ${params.symptoms}.`,
        suggested_questions: parsed.suggested_questions || [
          'When did symptoms first appear?',
          'Does anything aggravate or relieve the symptoms?',
          'Have you taken any over-the-counter medications?'
        ]
      };
    } catch (err) {
      console.warn('Gemini API call failed, using graceful fallback:', err);
      return this.fallbackPreVisitSummary(params);
    }
  }

  async generatePostVisitSummary(params: {
    clinicalNotes: string;
    diagnosis?: string;
  }): Promise<AIPostVisitSummary> {
    if (!this.apiKey) {
      return this.fallbackPostVisitSummary(params);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Convert these clinical notes into a clear patient-friendly summary. Return structured JSON ONLY:
- visit_summary (plain language summary of visit)
- important_findings (array of key observations)
- medication_schedule (array of objects with {medicine, dosage, frequency})
- care_instructions (array of strings)
- follow_up_steps (array of strings)

Clinical Notes: ${params.clinicalNotes}
Diagnosis: ${params.diagnosis || 'Unspecified'}`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error(`Gemini API error ${response.status}`);
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini');

      const parsed = JSON.parse(text);
      return {
        visit_summary: parsed.visit_summary || 'Consultation completed.',
        important_findings: parsed.important_findings || ['Doctor evaluated your reported symptoms.'],
        medication_schedule: parsed.medication_schedule || [],
        care_instructions: parsed.care_instructions || ['Follow prescribed routine and rest as needed.'],
        follow_up_steps: parsed.follow_up_steps || ['Contact clinic if symptoms persist.']
      };
    } catch (err) {
      console.warn('Gemini API post-visit summary failed, using fallback:', err);
      return this.fallbackPostVisitSummary(params);
    }
  }

  private fallbackPreVisitSummary(params: {
    symptoms: string;
    duration?: string;
    severity?: string;
  }): AIPreVisitSummary {
    const isHigh = params.severity?.toLowerCase() === 'high' || params.symptoms.toLowerCase().includes('chest pain');
    return {
      urgency_level: isHigh ? 'High' : params.severity === 'Moderate' ? 'Medium' : 'Low',
      chief_complaint: params.symptoms.slice(0, 50),
      concise_summary: `Patient reports experiencing: "${params.symptoms}" with reported duration of ${params.duration || 'recent onset'}.`,
      suggested_questions: [
        'When did you first notice these symptoms?',
        'Have you taken any medication for relief?',
        'Are there associated symptoms such as fever or fatigue?'
      ]
    };
  }

  private fallbackPostVisitSummary(params: {
    clinicalNotes: string;
    diagnosis?: string;
  }): AIPostVisitSummary {
    return {
      visit_summary: `Consultation completed regarding ${params.diagnosis || 'your health evaluation'}.`,
      important_findings: [params.clinicalNotes || 'No acute abnormalities documented.'],
      medication_schedule: [],
      care_instructions: [
        'Stay well hydrated and get sufficient rest.',
        'Take all prescribed medications according to doctor instructions.'
      ],
      follow_up_steps: ['Schedule follow-up appointment as advised.']
    };
  }
}

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER?.toLowerCase() || 'gemini';
  // Standard polymorphic factory
  return new GeminiAIProvider();
}

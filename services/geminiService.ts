import { GoogleGenAI, Type } from "@google/genai";
import { Idea } from '../types';
import { Locale } from '../types';

// Fix: Correct import paths for types
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getLocalizedSchema = (locale: Locale) => {
    const descriptions = {
        ar: {
            title: 'اسم مبتكر وجذاب لمشروع الهاكاثون باللغة العربية.',
            description: 'وصف قصير وواضح للفكرة باللغة العربية، يشرح المشكلة التي تحلها والحل المقترح.',
            features: 'قائمة بثلاث إلى خمس ميزات رئيسية للمشروع المقترح باللغة العربية.',
            targetAudience: 'تحديد الجمهور المستهدف للمشروع باللغة العربية.',
        },
        en: {
            title: 'An innovative and catchy name for the hackathon project in English.',
            description: 'A short and clear description of the idea in English, explaining the problem it solves and the proposed solution.',
            features: 'A list of three to five key features for the proposed project in English.',
            targetAudience: 'Definition of the target audience for the project in English.',
        },
        es: {
            title: 'Un nombre innovador y atractivo para el proyecto de hackathon en español.',
            description: 'Una descripción breve y clara de la idea en español, explicando el problema que resuelve y la solución propuesta.',
            features: 'Una lista de tres a cinco características clave para el proyecto propuesto en español.',
            targetAudience: 'Definición del público objetivo para el proyecto en español.',
        }
    };

    const d = descriptions[locale];

    return {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: d.title },
            description: { type: Type.STRING, description: d.description },
            features: { type: Type.ARRAY, items: { type: Type.STRING }, description: d.features },
            targetAudience: { type: Type.STRING, description: d.targetAudience },
        },
        required: ['title', 'description', 'features', 'targetAudience'],
    };
};

const getLocalizedPrompt = (locale: Locale, category1: string, category2: string): string => {
    const prompts = {
        ar: `
            بصفتك خبيرًا في الابتكار ومستشارًا للهاكاثونات، قم بتوليد فكرة مشروع هاكاثون هجينة ومبتكرة تدمج بين المجالين التاليين:
            المجال الأول: "${category1}"
            المجال الثاني: "${category2}"

            يجب أن تكون الفكرة إبداعية وقابلة للتنفيذ ضمن إطار زمني لهاكاثون (48 ساعة).
            قدم الإجابة بتنسيق JSON حصراً بناءً على المخطط المحدد باللغة العربية.
        `,
        en: `
            As an innovation expert and hackathon consultant, generate a hybrid and innovative hackathon project idea that merges the following two domains:
            Domain 1: "${category1}"
            Domain 2: "${category2}"

            The idea must be creative and feasible within a hackathon timeframe (48 hours).
            Provide the answer exclusively in JSON format based on the specified schema, in English.
        `,
        es: `
            Como experto en innovación y consultor de hackatones, genera una idea de proyecto de hackathon híbrida e innovadora que fusione los siguientes dos dominios:
            Dominio 1: "${category1}"
            Dominio 2: "${category2}"

            La idea debe ser creativa y factible dentro del marco de tiempo de un hackathon (48 horas).
            Proporciona la respuesta exclusivamente en formato JSON basado en el esquema especificado, en español.
        `
    };
    return prompts[locale];
};


export const generateHackathonIdea = async (category1: string, category2: string, locale: Locale): Promise<Idea> => {
  const prompt = getLocalizedPrompt(locale, category1, category2);
  const schema = getLocalizedSchema(locale);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const idea: Idea = JSON.parse(jsonText);
    return idea;
  } catch (error) {
    console.error("Error generating idea from Gemini:", error);
    const errorMessages = {
        ar: "فشل توليد الفكرة. الرجاء المحاولة مرة أخرى.",
        en: "Failed to generate idea. Please try again.",
        es: "No se pudo generar la idea. Por favor, inténtalo de nuevo."
    }
    throw new Error(errorMessages[locale]);
  }
};

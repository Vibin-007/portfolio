import resumeData from './resume-data.json'

// ─── Types ───────────────────────────────────────────────────────
interface Intent {
  patterns: string[]
  response: string
}

interface ResumeData {
  personal: {
    name: string
    role: string
    college: string
    cgpa: string
    objective: string
    personality: string[]
  }
  technicalSkills: string[]
  softSkills: string[]
  projects: {
    name: string
    techStack: string[]
    description: string
    category: string
    highlights: string[]
    algorithms?: string[]
    metrics?: string[]
    visualizations?: string[]
  }[]
  workshops: {
    name: string
    institution: string
    topics: string[]
  }[]
  certifications: {
    provider: string
    name: string
  }[]
  intents: Record<string, Intent>
}

const data: ResumeData = resumeData as ResumeData

// ─── Stop Words ──────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs',
  'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
  'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with',
  'about', 'against', 'between', 'through', 'during', 'before', 'after', 'above',
  'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
  'how', 'all', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
  't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're',
  've', 'y', 'ain', 'aren', 'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven',
  'isn', 'ma', 'mightn', 'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren',
  'won', 'wouldn', 'could', 'would', 'shall', 'might', 'must', 'need',
  'tell', 'me', 'please', 'know', 'like', 'want', 'give', 'show', 'explain',
  'describe', 'list', 'mention', 'talk', 'vibin', 'vibin\'s', 'vibins', 'his', 'he'
])

// ─── Tokenizer ──────────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
}

// ─── Synonym Map ────────────────────────────────────────────────
const SYNONYMS: Record<string, string[]> = {
  'skills': ['abilities', 'expertise', 'proficiency', 'competencies', 'capabilities'],
  'projects': ['work', 'portfolio', 'applications', 'apps', 'builds'],
  'education': ['study', 'degree', 'college', 'university', 'academic', 'school', 'qualification'],
  'certifications': ['certificates', 'certified', 'courses', 'credentials'],
  'workshops': ['training', 'bootcamp', 'seminar', 'sessions'],
  'backend': ['server', 'api', 'serverside'],
  'frontend': ['ui', 'interface', 'client', 'clientside', 'design'],
  'machine': ['ml', 'ai', 'artificial', 'intelligence', 'deep'],
  'learning': ['training', 'model', 'algorithm'],
  'hire': ['recruit', 'employ', 'job', 'career', 'position', 'role', 'opportunity'],
  'different': ['unique', 'special', 'standout', 'distinguish'],
  'strongest': ['best', 'top', 'primary', 'main', 'strongest', 'favorite'],
  'experience': ['background', 'history', 'worked', 'exposure'],
  'database': ['sql', 'db', 'storage', 'postgresql', 'data'],
  'summary': ['summarize', 'overview', 'brief', 'sumup', 'profile'],
  'goodbye': ['bye', 'later', 'exit', 'quit', 'close'],
  'thanks': ['thank', 'thx', 'appreciate', 'great', 'awesome', 'nice', 'cool'],
  'greeting': ['hi', 'hello', 'hey', 'howdy', 'sup', 'greetings']
}

function expandWithSynonyms(tokens: string[]): string[] {
  const expanded = new Set(tokens)
  for (const token of tokens) {
    // Check if this token is a synonym key
    if (SYNONYMS[token]) {
      SYNONYMS[token].forEach(syn => expanded.add(syn))
    }
    // Check if this token appears in any synonym list
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (syns.includes(token)) {
        expanded.add(key)
      }
    }
  }
  return Array.from(expanded)
}

// ─── TF-IDF Scoring ─────────────────────────────────────────────
function computeTFIDF(queryTokens: string[], documentTokens: string[]): number {
  if (documentTokens.length === 0) return 0

  let score = 0
  const docTokenSet = new Set(documentTokens)

  for (const qt of queryTokens) {
    if (docTokenSet.has(qt)) {
      // Term frequency in document
      const tf = documentTokens.filter(dt => dt === qt).length / documentTokens.length
      // Simple IDF approximation (boost rarer matches)
      const idf = Math.log(1 + 1 / (tf + 0.1))
      score += tf * idf
    } else {
      // Partial match (substring matching for compound words)
      for (const dt of documentTokens) {
        if (dt.includes(qt) || qt.includes(dt)) {
          score += 0.3
          break
        }
      }
    }
  }

  return score
}

// ─── Intent Matching ────────────────────────────────────────────
function matchIntent(userInput: string): { intent: string; confidence: number } | null {
  const input = userInput.toLowerCase().trim()
  const inputTokens = tokenize(input)
  const expandedTokens = expandWithSynonyms(inputTokens)

  let bestMatch: { intent: string; confidence: number } | null = null

  for (const [intentName, intentData] of Object.entries(data.intents)) {
    for (const pattern of intentData.patterns) {
      // Exact match
      if (input.includes(pattern)) {
        const confidence = pattern.length / input.length
        if (!bestMatch || confidence > bestMatch.confidence) {
          bestMatch = { intent: intentName, confidence: Math.min(confidence * 1.5, 1) }
        }
      }

      // Token-based TF-IDF match
      const patternTokens = tokenize(pattern)
      const tfidfScore = computeTFIDF(expandedTokens, patternTokens)

      if (tfidfScore > 0.1) {
        const normalizedScore = Math.min(tfidfScore * 2, 1)
        if (!bestMatch || normalizedScore > bestMatch.confidence) {
          bestMatch = { intent: intentName, confidence: normalizedScore }
        }
      }
    }
  }

  return bestMatch && bestMatch.confidence > 0.15 ? bestMatch : null
}

// ─── Keyword Fallback Search ────────────────────────────────────
function keywordSearch(userInput: string): string | null {
  const tokens = expandWithSynonyms(tokenize(userInput))

  // Build a corpus of searchable sections with their responses
  const sections: { tokens: string[]; response: string }[] = []

  // Personal info
  sections.push({
    tokens: tokenize(`${data.personal.name} ${data.personal.role} ${data.personal.college} ${data.personal.objective} ${data.personal.personality.join(' ')}`),
    response: data.intents.about.response
  })

  // Technical skills
  sections.push({
    tokens: tokenize(`technical skills programming languages ${data.technicalSkills.join(' ')}`),
    response: data.intents.technicalSkills.response
  })

  // Soft skills
  sections.push({
    tokens: tokenize(`soft skills personality traits ${data.softSkills.join(' ')}`),
    response: data.intents.softSkills.response
  })

  // Projects
  for (const project of data.projects) {
    const intentKey = project.category === 'fullstack' ? 'eventProject' : 'mlProject'
    sections.push({
      tokens: tokenize(`${project.name} ${project.techStack.join(' ')} ${project.description} ${project.highlights.join(' ')} ${(project.algorithms || []).join(' ')}`),
      response: data.intents[intentKey].response
    })
  }

  // Workshops
  sections.push({
    tokens: tokenize(`workshops training ${data.workshops.map(w => `${w.name} ${w.institution} ${w.topics.join(' ')}`).join(' ')}`),
    response: data.intents.workshops.response
  })

  // Certifications
  sections.push({
    tokens: tokenize(`certifications certificates ${data.certifications.map(c => `${c.provider} ${c.name}`).join(' ')}`),
    response: data.intents.certifications.response
  })

  // Score each section
  let bestSection: { response: string; score: number } | null = null

  for (const section of sections) {
    const score = computeTFIDF(tokens, section.tokens)
    if (score > 0.1 && (!bestSection || score > bestSection.score)) {
      bestSection = { response: section.response, score }
    }
  }

  return bestSection ? bestSection.response : null
}

// ─── Multi-part Question Handler ────────────────────────────────
function handleMultiPartQuestion(userInput: string): string | null {
  const input = userInput.toLowerCase()

  // Check for comparison questions
  if (input.includes('compare') && input.includes('project')) {
    return `Here's a comparison of my two projects:\n\n**College Event Management System**\n- *Type:* Full-Stack Web Application\n- *Focus:* Backend architecture, authentication, database design\n- *Tech:* Django, PostgreSQL, JavaScript\n- *Demonstrates:* Software engineering and web development skills\n\n**Machine Learning Web Application**\n- *Type:* Data Science / ML Application\n- *Focus:* ML algorithms, data visualization, model evaluation\n- *Tech:* Python, Streamlit, Scikit-learn\n- *Demonstrates:* Machine learning and data science expertise\n\n**Common Ground:** Both projects showcase my ability to build complete, functional applications from scratch. Together, they highlight my versatility across both web development and AI/ML.`
  }

  // Technologies in common
  if ((input.includes('common') || input.includes('frequent') || input.includes('across')) && (input.includes('tech') || input.includes('project'))) {
    return `Technologies that appear across my projects:\n\n- **Python** — Used in my ML Web Application and workshop training\n- **JavaScript** — Used in my Event Management System and certified by Meta\n- **HTML & CSS** — Foundation of my web development projects\n\nPython is my most frequently used technology, appearing in projects, workshops (IISc Bangalore, IIT Palakkad), and certifications.`
  }

  // What type of developer
  if (input.includes('type') && input.includes('developer')) {
    return `I'd describe myself as a **versatile, AI-focused full-stack developer**. I combine:\n\n- **Frontend skills** (HTML, CSS, JavaScript) for building user interfaces\n- **Backend expertise** (Django, PostgreSQL) for server-side logic and databases\n- **ML/AI capabilities** (Python, Scikit-learn, TensorFlow) for data-driven solutions\n\nI'm most passionate about the intersection of web development and artificial intelligence — building applications that are both user-friendly and intelligently powered.`
  }

  // Suitable role
  if ((input.includes('role') || input.includes('position') || input.includes('job')) && (input.includes('suit') || input.includes('fit') || input.includes('ideal') || input.includes('best'))) {
    return `Based on my skills and experience, I'd be well-suited for roles like:\n\n1. **Junior ML Engineer** — Given my hands-on ML experience and IISc/IIT training\n2. **Full-Stack Python Developer** — With my Django + frontend skills\n3. **Data Science Intern** — Leveraging my Scikit-learn, Pandas, and visualization expertise\n4. **AI Application Developer** — Combining web development with ML capabilities\n\nI'm particularly drawn to roles where I can apply AI/ML to solve real-world problems while building user-facing applications.`
  }

  // How does he solve problems
  if (input.includes('solve') && input.includes('problem')) {
    return `My approach to problem-solving involves:\n\n1. **Understanding the Problem** — I start by clearly defining what needs to be solved\n2. **Research & Planning** — I explore existing solutions and plan my approach\n3. **Iterative Building** — I build in small increments, testing frequently\n4. **Data-Driven Decisions** — When applicable, I use data analysis to guide my choices\n\nFor example, in my Event Management System, I identified the pain point of manual event registrations and built a scalable automated solution. In my ML project, I implemented multiple algorithms and used metrics like R² and RMSE to evaluate and compare their performance.`
  }

  return null
}

// ─── Main Response Generator ────────────────────────────────────
export function generateResponse(userInput: string): string {
  const trimmed = userInput.trim()

  if (!trimmed) {
    return "Please type a question and I'll do my best to answer it! 😊"
  }

  // 1. Try multi-part / reasoning questions first
  const multiPartResponse = handleMultiPartQuestion(trimmed)
  if (multiPartResponse) return multiPartResponse

  // 2. Try intent matching
  const match = matchIntent(trimmed)
  if (match && match.confidence > 0.15) {
    return data.intents[match.intent].response
  }

  // 3. Try keyword-based TF-IDF search
  const keywordResult = keywordSearch(trimmed)
  if (keywordResult) return keywordResult

  // 4. Fallback
  return "I don't have enough information to answer that based on Vibin's portfolio. Could you try rephrasing your question? You can ask me about Vibin's **education**, **projects**, **skills**, **certifications**, **workshops**, or **career goals**."
}

// ─── Suggested Questions ────────────────────────────────────────
export const SUGGESTED_QUESTIONS = [
  "Tell me about Vibin",
  "What projects has Vibin built?",
  "What are Vibin's strongest skills?",
  "Why should I hire Vibin?",
  "Explain his machine learning experience",
  "Summarize his resume",
  "What technologies does he know?",
  "Tell me about his education",
  "What makes him different?",
  "Describe his event management project"
]

export const WELCOME_MESSAGE = "Hi! 👋 I'm Vibin."

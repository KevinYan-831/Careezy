// LaTeX Service for generating professional resume templates
// This service converts resume data into LaTeX format for PDF generation

function generateLatexResume(resumeData) {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    extracurriculars = []
  } = resumeData;

  return `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${personalInfo.firstName || ''} ${personalInfo.lastName || ''}} \\\\ \\vspace{1pt}
    \\small ${personalInfo.phone || ''} $|$ \\href{mailto:${personalInfo.email || ''}}{\\underline{${personalInfo.email || ''}}} $|$ 
    ${personalInfo.address || ''}
\\end{center}

${education.length > 0 ? generateEducationSection(education) : ''}

${experience.length > 0 ? generateExperienceSection(experience) : ''}

${projects.length > 0 ? generateProjectsSection(projects) : ''}

${Object.keys(skills).length > 0 ? generateSkillsSection(skills) : ''}

${extracurriculars.length > 0 ? generateExtracurricularsSection(extracurriculars) : ''}

\\end{document}`;
}

function generateEducationSection(education) {
  return `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${education.map(edu => `    \\resumeSubheading
      {${edu.institution || ''}}{${edu.location || ''}}
      {${edu.degree || ''} in ${edu.field || ''}}{${edu.startDate || ''} -- ${edu.endDate || ''}}
      ${edu.gpa ? `\\resumeItem{GPA: ${edu.gpa}}` : ''}
      ${edu.coursework && edu.coursework.length > 0 ? `\\resumeItem{Relevant Coursework: ${edu.coursework.join(', ')}}` : ''}`).join('\n')}
  \\resumeSubHeadingListEnd`;
}

function generateExperienceSection(experience) {
  return `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${experience.map(exp => `    \\resumeSubheading
      {${exp.title || ''}}{${exp.startDate || ''} -- ${exp.endDate || ''}}
      {${exp.company || ''}}{${exp.location || ''}}
      \\resumeItemListStart
${exp.description && exp.description.length > 0 ? exp.description.map((desc) => `        \resumeItem{${desc}}`).join('\n') : '        \resumeItem{Description not provided}'}
      \\resumeItemListEnd`).join('\n')}
  \\resumeSubHeadingListEnd`;
}

function generateProjectsSection(projects) {
  return `%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
${projects.map(project => `      \\resumeProjectHeading
          {\\textbf{${project.name || ''}} $|$ \\emph{${project.technologies ? project.technologies.join(', ') : ''}}}{${project.startDate || ''} -- ${project.endDate || ''}}
          \\resumeItemListStart
            \\resumeItem{${project.description || 'Project description not provided'}}
          \\resumeItemListEnd`).join('\n')}
    \\resumeSubHeadingListEnd`;
}

function generateSkillsSection(skills) {
  const skillSections = [];
  
  if (skills.technical && skills.technical.length > 0) {
    skillSections.push(`Technical: ${skills.technical.join(', ')}`);
  }
  
  if (skills.languages && skills.languages.length > 0) {
    skillSections.push(`Languages: ${skills.languages.join(', ')}`);
  }
  
  if (skills.other && skills.other.length > 0) {
    skillSections.push(`Other: ${skills.other.join(', ')}`);
  }

  if (skillSections.length === 0) return '';

  return `%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillSections.map(section => `     \\textbf{${section}} \\\\`).join('\n')}
    }}
 \\end{itemize}`;
}

function generateExtracurricularsSection(extracurriculars) {
  return `%-----------EXTRACURRICULAR ACTIVITIES-----------
\\section{Extracurricular Activities}
  \\resumeSubHeadingListStart
${extracurriculars.map(activity => `    \\resumeSubheading
      {${activity.activity || ''}}{${activity.startDate || ''} -- ${activity.endDate || ''}}
      {${activity.role || ''}}{}
      \\resumeItemListStart
        \\resumeItem{${activity.description || 'Activity description not provided'}}
      \\resumeItemListEnd`).join('\n')}
  \\resumeSubHeadingListEnd`;
}

// Alternative template for a more modern look
function generateModernLatexResume(resumeData) {
  // This could be an alternative template with different styling
  // For now, return the same template
  return generateLatexResume(resumeData);
}

// Template for freshmen with less experience
function generateFreshmanLatexResume(resumeData) {
  // This template emphasizes education and projects over experience
  const {
    personalInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    extracurriculars = []
  } = resumeData;

  // Similar structure but reorder sections to prioritize education and projects
  return generateLatexResume({
    personalInfo,
    education,
    projects, // Projects before experience for freshmen
    experience,
    skills,
    extracurriculars
  });
}

module.exports = {
  generateLatexResume,
  generateModernLatexResume,
  generateFreshmanLatexResume
};
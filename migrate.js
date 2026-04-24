const fs = require('fs');

const pageContent = fs.readFileSync('app/admin-test/page.tsx', 'utf-8');

// Use regex to locate the QUESTIONS array
const startIndex = pageContent.indexOf('const QUESTIONS = [');
const endIndex = pageContent.indexOf('export default function AdminTestPage()');

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find boundaries");
    process.exit(1);
}

let questionsSource = pageContent.substring(startIndex, endIndex);

// Just replace "const QUESTIONS = " with "module.exports = "
questionsSource = questionsSource.replace('const QUESTIONS =', 'module.exports =');

fs.writeFileSync('temp_questions.js', questionsSource);

const questions = require('./temp_questions.js');

if (!fs.existsSync('app/admin-test/questions')) {
    fs.mkdirSync('app/admin-test/questions');
}

const map = {};
for (const q of questions) {
    let sectionNum = "intro";
    const m = q.section.match(/^(\d+)/);
    if (m && m[1] !== "0") {
        sectionNum = "section" + m[1];
    }
    
    if (!map[sectionNum]) map[sectionNum] = [];
    map[sectionNum].push(q);
}

let indexExports = [];
let indexArray = [];

for (const [key, items] of Object.entries(map)) {
    // Generate file
    const content = `export const ${key} = ${JSON.stringify(items, null, 4)};\n`;
    fs.writeFileSync(`app/admin-test/questions/${key}.ts`, content);
    
    indexExports.push(`import { ${key} } from './${key}';`);
    indexArray.push(`...${key}`);
}

const finalIndex = `${indexExports.join('\n')}

export const QUESTIONS = [
    ${indexArray.join(',\n    ')}
];
`;

fs.writeFileSync('app/admin-test/questions/index.ts', finalIndex);

// Now update page.tsx
let newPageContent = pageContent.substring(0, startIndex);
newPageContent += `import { QUESTIONS } from './questions';\n\n`;
newPageContent += pageContent.substring(endIndex);

fs.writeFileSync('app/admin-test/page.tsx', newPageContent);
console.log("Migration complete!");

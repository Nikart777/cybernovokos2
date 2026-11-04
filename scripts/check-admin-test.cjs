const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const questionsDir = path.resolve(__dirname, '../app/admin-test/questions');

function loadQuestionsModule(filename, cache = new Map()) {
    const fullPath = path.resolve(questionsDir, filename);
    if (cache.has(fullPath)) return cache.get(fullPath);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    const exports = {};
    cache.set(fullPath, exports);
    vm.runInNewContext(outputText, {
        exports,
        require: (specifier) => {
            assert.match(specifier, /^\.\/[a-zA-Z0-9]+$/);
            return loadQuestionsModule(`${specifier}.ts`, cache);
        },
    }, { filename: fullPath });
    return exports;
}

function checkQuestions() {
    const cache = new Map();
    const { QUESTIONS } = loadQuestionsModule('index.ts', cache);
    const ids = new Set();
    const texts = new Set();
    const sections = new Set();

    assert.ok(QUESTIONS.length > 0, 'Question bank must not be empty');
    for (const question of QUESTIONS) {
        const id = String(question.id);
        assert.ok(id && id !== 'undefined', 'Every question needs an ID');
        assert.ok(!ids.has(id), `Duplicate question ID: ${id}`);
        ids.add(id);
        for (const field of ['question', 'section', 'explanation']) {
            assert.equal(typeof question[field], 'string', `${id}: missing ${field}`);
            assert.ok(question[field].trim(), `${id}: empty ${field}`);
        }
        assert.ok(!texts.has(question.question.trim()), `${id}: duplicate question text`);
        texts.add(question.question.trim());
        assert.ok(Array.isArray(question.options), `${id}: missing options`);
        assert.ok(question.options.length >= 3 && question.options.length <= 4,
            `${id}: UI supports three or four answers`);
        assert.ok(question.options.every(option => typeof option === 'string' && option.trim()),
            `${id}: empty answer`);
        assert.equal(new Set(question.options.map(option => option.trim())).size,
            question.options.length, `${id}: duplicate answers`);
        assert.ok(Number.isInteger(question.correct) && question.correct >= 0 &&
            question.correct < question.options.length, `${id}: invalid correct answer index`);
        const section = question.section.match(/^(\d+(?:\.\d+)?)\. /)?.[1];
        assert.ok(section, `${id}: section number missing`);
        sections.add(section);
    }

    // Every question file must be included: sections 16–18 were previously silently omitted.
    for (const filename of fs.readdirSync(questionsDir).filter(name => name.endsWith('.ts') && name !== 'index.ts')) {
        const data = loadQuestionsModule(filename, cache);
        for (const bank of Object.values(data)) {
            assert.ok(Array.isArray(bank), `${filename}: expected a question array`);
            for (const question of bank) {
                assert.ok(QUESTIONS.includes(question), `${filename}: ${question.id} is not included in the test`);
            }
        }
    }

    // Intro, all 19 rules sections, and the new refund subsection must be covered.
    for (const section of [...Array.from({ length: 20 }, (_, index) => String(index)), '7.1']) {
        assert.ok(sections.has(section), `Rules section ${section} has no questions`);
    }
    assert.equal(QUESTIONS.filter(question => question.id === 'refunds_1').length, 1);
    console.log(`Admin test: ${QUESTIONS.length} questions, ${sections.size} sections; all IDs, answers and imports valid.`);
}

if (require.main === module) checkQuestions();
module.exports = { loadQuestionsModule };

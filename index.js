const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

function obfuscateCode(inputCode) {
    const obfuscationOptions = {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        seed: Math.random() * 1000000,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: 4000, 
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        rotateStringArray: true,
        shuffleStringArray: true,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
    };

    try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(inputCode, obfuscationOptions);
        return obfuscationResult.getObfuscatedCode();
    } catch (error) {
        console.error('Error during obfuscation:', error);
        return null;
    }
}

function obfuscateFile(inputPath, outputPath) {
    try {
        const code = fs.readFileSync(inputPath, 'utf8');
        const obfuscatedCode = obfuscateCode(code);
        
        if (obfuscatedCode) {
            fs.writeFileSync(outputPath, obfuscatedCode);
            console.log(`Successfully obfuscated ${inputPath} to ${outputPath}`);
        }
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

if (process.argv.length >= 4) {
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];
    obfuscateFile(inputFile, outputFile);
} else {
    console.log('Usage: node index.js <input-file> <output-file>');
}

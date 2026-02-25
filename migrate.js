const fs = require('fs');

const path = 'app/certificate/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace(
    `import { Send, Target, Users, Rocket, Heart, Crown, Monitor, Gamepad2, Coffee, Clock } from "lucide-react";`,
    `import SlotMachineNumber from "@/components/SlotMachineNumber";\nimport GiftCalculator from "@/components/GiftCalculator";\nimport { Send, Target, Users, Rocket, Heart, Crown, Monitor, Gamepad2, Coffee, Clock } from "lucide-react";`
);

// 2. Replace static 5000 with SlotMachineNumber
content = content.replace(
    `<span className="text-[3.5rem] min-[360px]:text-[4.5rem] md:text-[5.5rem] font-tactic italic font-black leading-none tracking-tighter">5000</span>`,
    `<SlotMachineNumber />`
);

// 3. Remove Contacts component
content = content.replace(/<Contacts \/>[\r\n]*/g, '');

// 4. Reorder blocks: Move Level Up below Zones Gallery and rename it
const happinessStart = content.indexOf('{/* HAPPINESS LEVEL UP */}');
const zonesGalleryStart = content.indexOf('{/* ZONES GALLERY */}');
const ctaStart = content.indexOf('{/* CTA SECTION WITH STEPS */}');

const happinessBlock = content.substring(happinessStart, zonesGalleryStart);
const zonesGalleryBlock = content.substring(zonesGalleryStart, ctaStart);

let newHappinessBlock = happinessBlock.replace(
    `ШКАЛА <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B900FF]">LEVEL UP</span>`,
    `ПУТЬ К <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B900FF]">СЕРДЦУ МУЖЧИНЫ</span>`
);

const giftCalculatorBlock = `
        {/* GIFT CALCULATOR */}
        <section className="px-6 py-12 relative z-10">
          <div className="container mx-auto">
            <GiftCalculator />
          </div>
        </section>

`;

let finalContent = content.substring(0, happinessStart);
finalContent += zonesGalleryBlock;
finalContent += newHappinessBlock;
finalContent += content.substring(ctaStart);

finalContent = finalContent.replace('{/* TIERS */}', giftCalculatorBlock + '        {/* TIERS */}');

fs.writeFileSync(path, finalContent, 'utf8');
console.log('Script ran successfully!');

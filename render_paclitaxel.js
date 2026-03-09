const mjAPI = require("mathjax-node");
const fs = require("fs");

mjAPI.config({
  MathJax: {
    SVG: { font: "TeX" }
  }
});
mjAPI.start();

// Paclitaxel molecular formula and structural representation in LaTeX
const formulas = [
  {
    name: "paclitaxel_molecular_formula",
    math: String.raw`\boxed{\textbf{Paclitaxel (Taxol}^{\circledR}\textbf{)}} \quad \text{C}_{47}\text{H}_{51}\text{NO}_{14} \quad M_w = 853.91 \text{ g/mol}`,
    format: "TeX"
  },
  {
    name: "paclitaxel_structure",
    math: String.raw`
\begin{array}{c}
\text{Structural Formula of Paclitaxel} \\[12pt]
%
% Ring system representation using text-based layout
%
\begin{array}{ccccccccc}
& & & \text{OAc} & & & & & \\
& & & | & & & & & \\
& & & \text{C}_{10} & - & \text{OH} & & & \\
& & / & & \backslash & & & & \\
\text{AcO} & - & \text{C}_4 & & & \text{C}_9 & - & \text{OH} & \\
& & | & & & | & & & \\
& & \text{C}_3 & - & \text{O} & \text{C}_8 & & & \\
& / & & & & & \backslash & & \\
\text{PhCOO} & - & \text{C}_2 & & & & \text{C}_7 & - & \text{O} \\
& & | & & & & | & & | \\
& & \text{C}_1 & - & - & - & \text{C}_6 & & \text{C}_{20} \\
& & & & | & & & \backslash & | \\
& & & & \text{C}_5 & & & \text{O} & \\
& & & & | & & & & \\
& & & & \text{C} & (\text{CH}_3)_2 & & & \\
\end{array}
\\[16pt]
%
% Side chain at C-13
%
\underbrace{
\text{PhCONH} - \overset{\displaystyle\text{OH}}{\underset{|}{\text{CH}}} - \overset{\displaystyle\text{Ph}}{\underset{|}{\text{CH}}} - \text{COO} -
}_{\text{Side chain at C-13}}
\\[14pt]
%
% Full SMILES-like linear notation
%
\boxed{
\begin{array}{l}
\text{Key functional groups:} \\
\bullet\ \text{Taxane ring system (6/8/6/4 fused rings)} \\
\bullet\ \text{Oxetane ring (D-ring)} \\
\bullet\ \text{N-benzoyl-(2R,3S)-3-phenylisoserine side chain at C-13} \\
\bullet\ \text{Acetyl groups at C-4 and C-10} \\
\bullet\ \text{Benzoyl group at C-2} \\
\bullet\ \text{Hydroxyl groups at C-1, C-7, C-13 (side chain)} \\
\end{array}
}
\end{array}
`,
    format: "TeX"
  },
  {
    name: "paclitaxel_2d_skeleton",
    math: String.raw`
\begin{array}{c}
\\[-6pt]
\textbf{Paclitaxel 2D Skeletal Representation} \\[10pt]
%
% Top: side chain
\text{Ph}-\overset{\Large\text{O}}{\overset{\displaystyle\|}{\text{C}}}-\text{NH}-\underset{\displaystyle|}{\overset{\text{OH}}{}}\text{CH}-\underset{\displaystyle|}{\overset{\text{Ph}}{}}\text{CH}-\overset{\Large\text{O}}{\overset{\displaystyle\|}{\text{C}}}-\text{O}
\\[4pt] \Big\downarrow \scriptstyle{\text{C-13}} \\[4pt]
%
% Taxane core drawn as ASCII-art style
\boxed{
\begin{array}{ccccccc}
& \text{OH} & & \text{OAc} & & & \\
& | & & | & & & \\
\text{H}_3\text{C}-& \text{C}_1 &-& \text{C}_2 &-& \text{OCOC}_6\text{H}_5 & \\
& \| & & | & & & \\
& \text{C}_{14} & & \text{C}_3 & & & \\
& | & & \| & & & \\
\text{AcO}-& \text{C}_{10}&-& \text{C}_4 & & & \\
& | & & | & & & \\
& \text{C}_9 &-& \text{C}_5 &-& \text{C}(\text{CH}_3)_2 & \\
& | & & | & & & \\
\text{HO}-& \text{C}_7 &-& \text{C}_6 & & & \\
& | & & | & & & \\
& \text{O} &-& \text{C}_{20}&-& \text{O} & \\
& & & & \scriptstyle{\text{oxetane}} & & \\
\end{array}
}
\\[8pt]
\text{Molecular Formula: } \text{C}_{47}\text{H}_{51}\text{NO}_{14}
\qquad M_r = 853.91
\end{array}
`,
    format: "TeX"
  }
];

async function renderFormula(item) {
  return new Promise((resolve, reject) => {
    mjAPI.typeset({
      math: item.math,
      format: item.format,
      svg: true,
    }, (data) => {
      if (data.errors) {
        reject(data.errors);
      } else {
        resolve(data);
      }
    });
  });
}

async function main() {
  for (const item of formulas) {
    try {
      console.log(`Rendering ${item.name}...`);
      const data = await renderFormula(item);
      const svgFile = `${item.name}.svg`;
      fs.writeFileSync(svgFile, data.svg);
      console.log(`  -> Saved ${svgFile}`);
    } catch (err) {
      console.error(`  Error rendering ${item.name}:`, err);
    }
  }
}

main();

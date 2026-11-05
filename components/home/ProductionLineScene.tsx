

/**
 * Cena da linha contínua da home: transportador aéreo, máquina de gancheiras,
 * silo de granalha, cabine de pintura, estoque de peças e o técnico no fim da
 * linha. Desenho em SVG puro — as animações vivem em globals.css (.linha-*).
 *
 * O viewBox é 1600×540 e as coordenadas das paradas estão em
 * `home.productionLine.stations[].x`: mexer no desenho pede acertar os dois.
 *
 * As seis peças penduradas são geradas aqui mesmo; cada uma entra com um atraso
 * diferente na mesma animação, o que dá a fila de peças em estágios distintos.
 */
const PECAS = [0, 1, 2, 3, 4, 5];

export default function ProductionLineScene({ active }: { active: string }) {
  const st = (id: string) => "estacao" + (active === id ? " ativa" : "");
  return (
        <svg viewBox="0 0 1600 540" role="img" aria-label="Linha contínua Tecjato: a peça bruta entra na máquina de jateamento de gancheiras, passa pela cabine de pintura e é retirada pelo técnico no fim da linha">
          <defs>
            <linearGradient id="gAzulFrente" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0d5a9b"/><stop offset="1" stopColor="#01386a"/>
            </linearGradient>
            <linearGradient id="gCinzaFrente" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e3e9f0"/><stop offset="1" stopColor="#b6c2d1"/>
            </linearGradient>
            <linearGradient id="gChao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dde4ed"/><stop offset="1" stopColor="#ccd5e1"/>
            </linearGradient>
            <clipPath id="janelaSilo"><rect x="600" y="300" width="52" height="54" rx="4"/></clipPath>
            <clipPath id="cortePalco"><rect x="0" y="0" width="1600" height="540"/></clipPath>
          </defs>
          <rect x="0" y="452" width="1600" height="88" fill="url(#gChao)"/>
          <rect x="0" y="450" width="1600" height="3" fill="#b4c0cf"/>
          <ellipse cx="370" cy="456" rx="185" ry="12" fill="#92a1b5" opacity=".32"/>
          <ellipse cx="630" cy="456" rx="78" ry="9" fill="#92a1b5" opacity=".26"/>
          <ellipse cx="940" cy="456" rx="172" ry="12" fill="#92a1b5" opacity=".32"/>
          <ellipse cx="1250" cy="456" rx="78" ry="8" fill="#92a1b5" opacity=".24"/>
          <ellipse cx="1432" cy="456" rx="40" ry="8" fill="#92a1b5" opacity=".3"/>
          <rect x="58" y="84" width="15" height="368" fill="#9aa8bb"/>
          <rect x="46" y="444" width="39" height="9" rx="2" fill="#8795a9"/>
          <rect x="1540" y="84" width="15" height="368" fill="#9aa8bb"/>
          <rect x="1528" y="444" width="39" height="9" rx="2" fill="#8795a9"/>
          <rect x="30" y="56" width="1540" height="8" fill="#b2bfcf"/>
          <rect x="30" y="64" width="1540" height="14" fill="#8c9bb0"/>
          <rect x="30" y="78" width="1540" height="6" fill="#74849b"/>
          <g fill="#aab7c8" opacity=".9">
            <path d="M150 67 l9 4 -9 4z"/><path d="M450 67 l9 4 -9 4z"/><path d="M750 67 l9 4 -9 4z"/>
            <path d="M1050 67 l9 4 -9 4z"/><path d="M1350 67 l9 4 -9 4z"/>
          </g>
          <g clipPath="url(#cortePalco)">
          <g className={st("e-abrasivos")} id="e-abrasivos">
            <path d="M566 214 L520 214 L520 150 L470 150" fill="none" stroke="#8c9bb0" strokeWidth="13" strokeLinejoin="round"/>
            <rect x="574" y="284" width="11" height="170" fill="#2f3845"/>
            <rect x="676" y="284" width="11" height="170" fill="#2f3845"/>
            <path d="M566 198 L590 180 L718 180 L694 198 Z" fill="#1267ab"/>
            <path d="M694 198 L718 180 L718 266 L694 284 Z" fill="#012b4f"/>
            <rect x="566" y="198" width="128" height="86" fill="url(#gAzulFrente)"/>
            <path d="M566 284 L694 284 L648 358 L612 358 Z" fill="#0d5a9b"/>
            <path d="M694 284 L718 266 L668 346 L648 358 Z" fill="#012b4f"/>
            <rect x="612" y="358" width="36" height="22" fill="#012b4f"/>
            <rect x="598" y="298" width="56" height="58" rx="5" fill="#e8eef5"/>
            <g clipPath="url(#janelaSilo)" className="granalha" fill="#8796a9">
              <circle cx="612" cy="312" r="5"/>
              <circle cx="628" cy="306" r="4.2" style={{ animationDelay: "-.45s" }}/>
              <circle cx="641" cy="316" r="5.4" style={{ animationDelay: "-.9s" }}/>
              <circle cx="620" cy="322" r="3.8" style={{ animationDelay: "-1.15s" }}/>
            </g>
            <g fill="#8796a9">
              <circle cx="610" cy="348" r="5"/><circle cx="622" cy="351" r="5"/>
              <circle cx="634" cy="348" r="5"/><circle cx="645" cy="351" r="4.4"/>
            </g>
            <rect x="598" y="298" width="56" height="58" rx="5" fill="none" stroke="#012b4f" strokeWidth="3"/>
          </g>
          <g id="carros">
            {PECAS.map((i) => (
              <g className="carro" key={i}>
                <g transform="translate(96,0)">
                  <rect x="-19" y="38" width="38" height="18" rx="4" fill="#5c6b80" />
                  <rect x="-3" y="56" width="6" height="206" fill="#6b7a8d" />
                  <path d="M0 262 q-13 0 -13 13" fill="none" stroke="#6b7a8d" strokeWidth="6" />
                  <rect className="peca-corpo" x="-40" y="276" width="80" height="70" rx="7" fill="#9a5b36" />
                  <circle cx="-19" cy="298" r="7" fill="#ffffff" opacity=".2" />
                  <circle cx="19" cy="298" r="7" fill="#ffffff" opacity=".2" />
                  <rect x="-40" y="324" width="80" height="6" fill="#000000" opacity=".12" />
                  <g className="ferrugem" fill="#6b3b1f">
                    <circle cx="-26" cy="332" r="6" />
                    <circle cx="5" cy="336" r="7.5" />
                    <circle cx="27" cy="318" r="4.5" />
                  </g>
                </g>
              </g>
            ))}
          </g>
          <g className={st("e-equipamentos")} id="e-equipamentos">
            <rect x="240" y="158" width="15" height="258" fill="#242c38"/>
            <rect x="520" y="158" width="15" height="258" fill="#242c38"/>
            <path d="M198 184 L232 158 L540 158 L506 184 Z" fill="#f2c634"/>
            <path d="M506 184 L540 158 L540 170 L506 196 Z" fill="#c69a16"/>
            <rect x="198" y="184" width="308" height="12" fill="#dcae20"/>
            <rect x="232" y="100" width="308" height="6" fill="#f2c634"/>
            <rect x="232" y="128" width="308" height="5" fill="#f2c634"/>
            <g fill="#f2c634">
              <rect x="233" y="100" width="6" height="58"/><rect x="312" y="100" width="6" height="58"/>
              <rect x="391" y="100" width="6" height="58"/><rect x="470" y="100" width="6" height="58"/>
              <rect x="534" y="100" width="6" height="58"/>
            </g>
            <path d="M198 126 L232 100 M198 152 L232 126" stroke="#f2c634" strokeWidth="6"/>
            <rect x="198" y="126" width="6" height="58" fill="#f2c634"/>
            <path d="M262 112 L286 94 L494 94 L470 112 Z" fill="#1267ab"/>
            <path d="M470 112 L494 94 L494 140 L470 158 Z" fill="#012b4f"/>
            <rect x="262" y="112" width="208" height="46" fill="url(#gAzulFrente)"/>
            <circle cx="308" cy="135" r="15" fill="#012b4f"/><circle cx="308" cy="135" r="6.5" fill="#0057ff"/>
            <circle cx="424" cy="135" r="15" fill="#012b4f"/><circle cx="424" cy="135" r="6.5" fill="#0057ff"/>
            <rect x="206" y="196" width="17" height="238" fill="#2f3845"/>
            <rect x="484" y="196" width="17" height="238" fill="#2f3845"/>
            <path d="M236 250 L266 228 L518 228 L488 250 Z" fill="#1267ab"/>
            <path d="M488 250 L518 228 L518 404 L488 426 Z" fill="#012b4f"/>
            <rect x="236" y="250" width="252" height="176" fill="url(#gAzulFrente)"/>
            <rect x="266" y="268" width="92" height="142" rx="3" fill="#b3591c"/>
            <rect x="364" y="268" width="92" height="142" rx="3" fill="#c2651f"/>
            <rect x="274" y="278" width="76" height="56" rx="2" fill="#9d4c17"/>
            <rect x="372" y="278" width="76" height="56" rx="2" fill="#aa5519"/>
            <rect x="352" y="330" width="7" height="24" rx="3" fill="#6f3410"/>
            <rect x="363" y="330" width="7" height="24" rx="3" fill="#6f3410"/>
            <rect x="228" y="272" width="15" height="80" rx="3" fill="#011f3b"/>
            <rect x="481" y="272" width="15" height="80" rx="3" fill="#011f3b"/>
            <g className="faisca" fill="#8ec5ff">
              <circle cx="250" cy="292" r="3.4"/><circle cx="256" cy="330" r="2.6"/>
              <circle cx="470" cy="298" r="3"/><circle cx="474" cy="336" r="2.4"/>
            </g>
            <rect x="228" y="426" width="268" height="26" fill="#01386a"/>
            <path d="M496 426 L526 404 L526 430 L496 452 Z" fill="#012b4f"/>
            <rect x="286" y="378" width="152" height="28" rx="4" fill="#0057ff"/>
            <text x="362" y="398" textAnchor="middle" fontFamily="Lexend, sans-serif" fontSize="15" fontWeight="700" fill="#fff" letterSpacing="2.5">TECJATO</text>
          </g>
          <g className={st("e-pintura")} id="e-pintura">
            <rect x="1016" y="156" width="38" height="66" fill="#c4cedb"/>
            <path d="M1016 156 L1034 142 L1072 142 L1054 156 Z" fill="#dfe6ee"/>
            <rect x="1054" y="142" width="18" height="66" fill="#a4b1c1"/>
            <g className="vapor" fill="#9fb3c8" opacity=".45"><circle cx="1038" cy="138" r="11"/></g>
            <path d="M790 250 L826 222 L1126 222 L1090 250 Z" fill="#eef2f7"/>
            <path d="M1090 250 L1126 222 L1126 402 L1090 430 Z" fill="#a4b1c1"/>
            <rect x="790" y="250" width="300" height="180" fill="url(#gCinzaFrente)"/>
            <rect x="802" y="268" width="20" height="148" rx="3" fill="#f97316"/>
            <rect x="1058" y="268" width="20" height="148" rx="3" fill="#f97316"/>
            <rect x="782" y="272" width="15" height="80" rx="3" fill="#64748b"/>
            <rect x="1083" y="272" width="15" height="80" rx="3" fill="#64748b"/>
            <g fill="#0057ff" opacity=".9">
              <rect x="868" y="264" width="10" height="28" rx="4"/>
              <rect x="938" y="264" width="10" height="28" rx="4"/>
              <rect x="1008" y="264" width="10" height="28" rx="4"/>
            </g>
            <g className="faisca" fill="#0057ff" opacity=".35">
              <circle cx="873" cy="312" r="13"/><circle cx="943" cy="318" r="14"/><circle cx="1013" cy="310" r="12"/>
            </g>
            <rect x="784" y="430" width="312" height="22" fill="#94a3b8"/>
            <rect x="840" y="380" width="152" height="28" rx="4" fill="#014076"/>
            <text x="916" y="400" textAnchor="middle" fontFamily="Lexend, sans-serif" fontSize="15" fontWeight="700" fill="#fff" letterSpacing="2.5">TECJATO</text>
          </g>
          <g className={st("e-reposicao")} id="e-reposicao">
            <rect x="1182" y="366" width="140" height="10" rx="2" fill="#8c9bb0"/>
            <rect x="1182" y="414" width="140" height="10" rx="2" fill="#8c9bb0"/>
            <rect x="1186" y="376" width="9" height="76" fill="#9aa8bb"/>
            <rect x="1309" y="376" width="9" height="76" fill="#9aa8bb"/>
            <g fill="#7a8ba0">
              <circle cx="1212" cy="350" r="15"/><circle cx="1250" cy="350" r="15"/><circle cx="1288" cy="350" r="15"/>
              <rect x="1196" y="386" width="30" height="28" rx="3"/>
              <rect x="1234" y="386" width="30" height="28" rx="3"/>
              <rect x="1272" y="386" width="30" height="28" rx="3"/>
            </g>
            <g fill="#0057ff" opacity=".8">
              <circle cx="1212" cy="350" r="6"/><circle cx="1250" cy="350" r="6"/><circle cx="1288" cy="350" r="6"/>
            </g>
            <g fill="#5d6c80">
              <rect x="1202" y="394" width="18" height="4"/><rect x="1240" y="394" width="18" height="4"/>
              <rect x="1278" y="394" width="18" height="4"/>
            </g>
          </g>
          <g className={st("e-assistencia")} id="e-assistencia">
            <rect x="1376" y="394" width="130" height="10" rx="2" fill="#8c9bb0"/>
            <rect x="1382" y="404" width="8" height="48" fill="#9aa8bb"/>
            <rect x="1492" y="404" width="8" height="48" fill="#9aa8bb"/>
            <g transform="translate(1432,0)">
              <rect x="-13" y="396" width="11" height="56" rx="5" fill="#2c3a4e"/>
              <rect x="3" y="396" width="11" height="56" rx="5" fill="#223044"/>
              <path d="M-19 316 Q0 304 19 316 L23 400 L-23 400 Z" fill="#f97316"/>
              <rect x="-19" y="348" width="42" height="10" fill="#ffd98a" opacity=".9"/>
              <circle cx="0" cy="292" r="18" fill="#e8c3a0"/>
              <path d="M-19 290 Q0 270 19 290 L19 283 Q0 265 -19 283 Z" fill="#f2c634"/>
              <g className="braco">
                <rect x="16" y="316" width="10" height="58" rx="5" fill="#f97316"/>
                <circle cx="21" cy="376" r="7" fill="#e8c3a0"/>
              </g>
            </g>
            <g transform="translate(1476,344) rotate(26)" fill="#64748b">
              <rect x="0" y="0" width="8" height="38" rx="3"/>
              <path d="M-5 0 L13 0 L13 10 L7 10 L7 5 L1 5 L1 10 L-5 10 Z"/>
            </g>
          </g>
          </g>
        </svg>
  );
}

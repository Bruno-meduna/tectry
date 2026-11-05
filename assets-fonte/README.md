# assets-fonte

Material bruto de onde saem as imagens publicadas. **Nada aqui é servido pelo
site** — o Next.js só serve o que está em `public/`.

| Pasta             | O que guarda                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `fotos-originais` | Fotos em alta das máquinas, direto do OneDrive. Fora do git (49 MB). |
| `logos`           | Arquivos originais da marca Tecjato.                               |
| `logos-clientes`  | Logos enviados pelos clientes, antes do tratamento.                |

Fluxo: trate o arquivo aqui (recorte, remoção de fundo, compressão) e salve a
versão final em `public/` — `public/fotos`, `public/logo` ou `public/clientes`.

O logo do cabeçalho e do rodapé (`public/logo/tecjato.png` e
`public/logo/tecjato-branco.png`) é gerado a partir de
`logos/tecjato-original.png`, que é o único arquivo com fundo transparente.

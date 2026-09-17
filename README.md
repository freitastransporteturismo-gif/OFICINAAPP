# Oficina — Ordens de Serviço

Sistema interno para oficinas mecânicas e centros automotivos: zera o papel,
guarda o histórico de cada cliente e veículo, tira fotos de antes/depois de
cada serviço, monta o orçamento e manda pro cliente pelo WhatsApp com um
clique.

## Estrutura

```
supabase/migrations/0001_init.sql   -> tabelas + bucket de fotos
src/pages/LoginPage.tsx             -> login (uma conta só, pra oficina toda)
src/pages/ClientsPage.tsx           -> lista/busca/cadastro de clientes
src/pages/ClientDetailPage.tsx      -> veículos do cliente + ordens de serviço
src/pages/ServiceOrderPage.tsx      -> a ordem de serviço em si: status,
                                        descrição, fotos antes/depois,
                                        itens do orçamento e envio no WhatsApp
```

## Como funciona, na prática

1. **Login** — uma conta só para a oficina inteira (sem cadastro de vários
   funcionários por enquanto).
2. **Cliente e veículo** — cadastra o cliente (nome + WhatsApp) e os
   veículos dele (marca, modelo, ano, placa). Um cliente pode ter mais de
   um veículo.
3. **Ordem de serviço (OS)** — para cada visita, cria uma OS vinculada ao
   veículo:
   - Escreve a descrição do problema/serviço.
   - Tira **fotos de antes** (direto da câmera do celular) para registrar o
     estado do veículo.
   - Adiciona os **itens do orçamento** (peça ou serviço + valor) — o total
     é calculado sozinho.
   - Depois do serviço pronto, adiciona as **fotos de depois**.
   - Muda o **status** conforme anda: aberta → em andamento → aguardando
     aprovação → aprovado → concluído.
4. **Orçamento no WhatsApp** — o botão "Enviar orçamento pelo WhatsApp" abre
   a conversa com o cliente já com a lista de itens e o total escritos na
   mensagem. É só apertar enviar.

## Como subir no Lovable

1. Suba esta pasta para um repositório no GitHub e importe no Lovable
   ("Import from GitHub").
2. Ative o **Lovable Cloud** (Supabase).
3. Rode `supabase/migrations/0001_init.sql` no banco — ela também cria o
   bucket de armazenamento `fotos-os` para as fotos.
4. Crie o usuário de acesso da oficina em **Authentication > Users** no
   Supabase Studio (e-mail + senha) — é essa conta que vai logar no sistema.
5. Confirme que `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão
   preenchidas (o Lovable Cloud normalmente já faz isso sozinho).

## Coisas importantes de saber

- **As fotos** ficam salvas no bucket público `fotos-os`. Qualquer pessoa
  com o link direto de uma foto consegue vê-la (mas não navega pelas outras
  sem o link) — é assim para o app poder mostrar as imagens sem
  complicação. Se isso for um problema para o seu negócio, dá para trocar o
  bucket para privado depois.
- **O orçamento no WhatsApp é só texto** — a mensagem que abre já vem com a
  lista de itens e o total, mas o wa.me não permite anexar as fotos
  automaticamente. Se quiser mandar as fotos junto, hoje precisa ser um
  passo manual (anexar na própria conversa do WhatsApp).
- **Login único**: pensado para uma oficina pequena/média com um acesso
  compartilhado. Se no futuro precisar de login individual por funcionário
  (pra saber quem editou o quê), dá pra evoluir usando o sistema de
  usuários do Supabase Auth que já está configurado.

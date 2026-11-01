import ClientBoot from "./client-boot";
export default function Home() {
  return (
    <>
      <a className="skip" href="#commands">
        Ir para o comando de carga
      </a>
      <header>
        <a href="/" className="brand">
          DOCA<span>TERMINAL DE POSSIBILIDADES</span>
        </a>
        <span>CAIS 04 / OPERAÇÃO IMAGINÁRIA</span>
        <a href="#manifest">Manifesto de carga ↓</a>
      </header>
      <main>
        <section className="port">
          <img
            className="port-photo"
            src="/media/subject.webp"
            alt="Contêineres reais organizados em um terminal portuário"
            width="1200"
            height="800"
          />
          <div className="port-overlay" />
          <div className="port-title">
            <span>ENTRE ORIGEM E DESTINO</span>
            <h1>
              Cada carga.
              <br />
              Um <em>lugar.</em>
            </h1>
            <p>
              Faça caber. Equilibre o peso.
              <br />
              Respeite os limites.
            </p>
          </div>
          <div className="port-label">
            PLANO ORTOGRÁFICO
            <br />
            SEM OPERAÇÃO REAL
          </div>
          <svg
            id="cargo-stage"
            viewBox="0 0 1100 600"
            role="img"
            aria-label="Plano de contêineres calculado no servidor, detalhado no manifesto de carga"
          >
            <g className="crane" aria-hidden="true">
              <path
                d="M65 520V50H950V90H85M900 90V165"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
              />
              <path d="M900 165l-12 14h24z" fill="currentColor" />
            </g>
            <g id="cargo-ground" />
            <g id="cargo-boxes" />
            <g id="cargo-measures" />
          </svg>
          <div className="water" aria-hidden="true" />
          <div className="port-foot">
            <span>ENTRAR / ENCONTRAR ESPAÇO / SEGUIR</span>
            <span>UM ENSAIO SOBRE LIMITES</span>
          </div>
        </section>
        <section id="commands">
          <div id="app-root">
            <p>Preparando o terminal…</p>
          </div>
        </section>
        <section className="operational-note">
          <h2>
            Caber é só
            <br />
            <em>o começo.</em>
          </h2>
          <div>
            <p>
              O contêiner mais pesado não pode se apoiar em um mais leve. Uma
              carga frágil não recebe outra por cima. Um volume largo precisa de
              bases na mesma altura.
            </p>
            <p>
              Aqui, essas regras se tornam visíveis. Este é um modelo sintético
              simplificado: não é um plano de estivagem ou orientação para
              operação real.
            </p>
            <a href="/api-docs.html">As regras do terminal ↗</a>
          </div>
        </section>
      </main>
      <footer>
        <strong>DOCA</strong>
        <span>Uma experiência de Gustavo Paz.</span>
        <a href="/credits.html">Fotografia, fontes e créditos ↗</a>
        <a href="https://github.com/gustapaz/doca">Código ↗</a>
        <button id="motion-toggle" aria-pressed="false">
          Pausar movimento
        </button>
      </footer>
      <ClientBoot />
    </>
  );
}

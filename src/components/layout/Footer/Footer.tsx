import { Icon, Logo } from '@/components/ui';
import './Footer.scss';

interface FooterColumn {
  heading: string;
  links: string[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Institucional',
    links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'],
  },
  {
    heading: 'Ajuda',
    links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
  },
  {
    heading: 'Termos',
    links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
  },
];

const SOCIAL = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'facebook', label: 'Facebook' },
  { name: 'linkedin', label: 'LinkedIn' },
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#topo" aria-label="Econverse — voltar ao topo">
            <Logo />
          </a>
          <p>
            Produtos de tecnologia, moda e muito mais com as melhores ofertas do mercado, frete
            grátis e parcelamento sem juros.
          </p>
          <ul className="footer__social">
            {SOCIAL.map((social) => (
              <li key={social.name}>
                <a href="#topo" aria-label={`Acompanhe no ${social.label}`}>
                  <Icon name={social.name} size={24} strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className="footer__divider" aria-hidden="true" />

        <nav className="footer__columns" aria-label="Links institucionais">
          {COLUMNS.map((column) => (
            <div className="footer__column" key={column.heading}>
              <h2 className="footer__heading">{column.heading}</h2>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="footer__link" href="#topo">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__copyright">
        <div className="container">
          <p>© 2026 Econverse. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import './Newsletter.scss';

export function Newsletter() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFeedback('Inscrição realizada! Você receberá nossas novidades.');
    form.reset();
  };

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter__inner">
        <div>
          <h2 className="newsletter__title" id="newsletter-title">
            Inscreva-se na nossa newsletter
          </h2>
          <p className="newsletter__text">
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <div className="newsletter__fields">
            <div className="newsletter__field">
              <label className="visually-hidden" htmlFor="newsletter-nome">
                Nome
              </label>
              <input
                className="newsletter__input"
                id="newsletter-nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div className="newsletter__field">
              <label className="visually-hidden" htmlFor="newsletter-email">
                E-mail
              </label>
              <input
                className="newsletter__input"
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <Button className="newsletter__submit" type="submit">
              Inscrever
            </Button>
          </div>

          <label className="newsletter__terms">
            <input type="checkbox" name="termos" required />
            Aceito os termos e condições
          </label>

          <p className="newsletter__feedback" role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}

// Progressive enhancement for [data-sh-form]: post with fetch and answer in place.
// Without JavaScript the forms still post normally to Kit or Formspree.
for (const form of document.querySelectorAll<HTMLFormElement>('form[data-sh-form]')) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector<HTMLElement>('[data-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const say = (text: string, state: 'error' | 'done' | '') => {
      if (!status) return;
      status.textContent = text;
      status.dataset.state = state;
    };

    button?.setAttribute('disabled', '');
    say('Sending…', '');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      form
        .querySelectorAll('.sh-field, .sh-form--inline, button[type="submit"]')
        .forEach((el) => el.remove());
      say(form.dataset.done ?? 'Thank you.', 'done');
    } catch {
      button?.removeAttribute('disabled');
      say(
        'That did not go through. Please try again, or email hello@stronghandssoftheart.com.',
        'error',
      );
    }
  });
}

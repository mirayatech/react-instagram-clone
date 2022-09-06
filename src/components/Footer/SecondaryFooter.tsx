export function SecondaryFooter() {
  return (
    <footer className="secondary__footer">
      <footer>
        <p tabIndex={1}>
          Built with
          <span className="footer__emoji" aria-label="love">
            &nbsp;💙&nbsp;
          </span>
          by&nbsp;
          <a tabIndex={1} href="https://github.com/mirayatech" target="_blank">
            Miraya
          </a>
        </p>
      </footer>
    </footer>
  )
}

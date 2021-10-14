import React from "react";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>{`Gabriel Ramos • ${date}`}</p>
      <p>|</p>
      <p>
        <a href="http://linkedin.com/in/gabrielocramos" target="_blank">
          LinkedIn
        </a>
      </p>
      <p>•</p>
      <p>
        <a href="http://instagram.com/eugaoliver" target="_blank">
          Instagram
        </a>
      </p>
      <p>•</p>
      <p>
        <a href="http://github.com/eugaoliver" target="_blank">
          GitHub
        </a>
      </p>
      <p>•</p>
      <p>
        <a href="mailto:gabriel.o.c.ramos@gmail.com">E-Mail</a>
      </p>
    </footer>
  );
}

export default Footer;

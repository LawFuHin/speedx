import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./footer.css";

export default function Footer() {
  return (
    <div className="container footerContainer ">
      <section class="mb-4 text-center footerIconContainer">
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-facebook-f"></i>
        </a>

        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-twitter"></i>
        </a>

        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-google"></i>
        </a>

        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-instagram"></i>
        </a>

        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-linkedin-in"></i>
        </a>

        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i class="fab fa-github"></i>
        </a>
      </section>
      <div class="text-center copyrightFooter">© 2023 Copyright:SpeedX</div>
    </div>
  );
}

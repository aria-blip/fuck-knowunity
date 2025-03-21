import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fuck-knowunity</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  
/>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" />

      </head>
      <body>
        <Component />

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <footer class="footer mt-auto py-2" style="background: linear-gradient(90deg, #fffde7, #fff9c4); font-size: 0.8rem; position: fixed; bottom: 0; width: 100%; text-align: center; box-shadow: 0 -1px 3px rgba(0,0,0,0.1);">
  <div class="container">
    <span class="text-muted">
      created by <a href="https://github.com/aria-blip/fuck-knowunity/blob/main/README.md" style="text-decoration: none; color: #b39800; font-weight: 500;">ARI</a>
    </span>
  </div>
</footer>
      </body>
    </html>
  );
}

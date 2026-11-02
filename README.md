# Jardinería 2.0 — landing

Sitio público de Jardinería 2.0: servicios, trabajos y contacto por WhatsApp.

Es HTML y CSS estático servido con Vite (sin framework ni JavaScript de cliente),
así el contenido queda en el HTML para buscadores y la página carga rápido.

```bash
npm install
npm run dev       # desarrollo en http://localhost:3000
npm run build     # genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

- `index.html`: contenido, SEO (title, description, Open Graph) y datos estructurados.
- `src/style.css`: estilos.
- `public/fotos/`: fotos optimizadas en WebP, generadas desde los originales de `src/assets/`.

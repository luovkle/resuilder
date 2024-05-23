import { z } from "zod";

const settings_validator = () => {
  const schema = z.object({
    // Editor
    VITE_EDITOR_API_HTTP_URL: z.string().url(),

    // Renderer
    VITE_RENDERER_HTTP_URL: z.string().url(),

    // Generator
    VITE_GENERATOR_HTTP_URL: z.string().url(),

    // Auth0
    VITE_AUTH0_DOMAIN: z.string(),
    VITE_AUTH0_CLIENT_ID: z.string(),
    VITE_AUTH0_AUDIENCE: z.string().url(),
  });

  return schema.parse(import.meta.env);
};

const settings = settings_validator();

export default settings;

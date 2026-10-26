export type Env = {
  ASSETS: Fetcher;
  CONTENT?: KVNamespace;
  KANRI_KEY?: string;
  DB?: D1Database;
  IMAGES?: ImagesBinding;
  EMAIL?: {
    send(m: {
      to: string; from: { email: string; name?: string }; replyTo?: string;
      subject: string; text: string; html: string;
    }): Promise<unknown>;
  };
};
